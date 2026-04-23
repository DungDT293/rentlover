from __future__ import annotations

import logging
import os
import uuid
from datetime import datetime, timezone

import boto3
from botocore.config import Config as BotoConfig
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

ALLOWED_TYPES = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
}

MAX_FILE_SIZE_MB = 50
PRESIGNED_URL_EXPIRY = 3600


class R2Storage:
    def __init__(
        self,
        account_id: str,
        access_key: str,
        secret_key: str,
        bucket_name: str,
        public_domain: str | None = None,
    ) -> None:
        self._bucket = bucket_name
        self._public_domain = public_domain

        endpoint_url = f"https://{account_id}.r2.cloudflarestorage.com"

        self._client = boto3.client(
            "s3",
            endpoint_url=endpoint_url,
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            config=BotoConfig(
                signature_version="s3v4",
                retries={"max_attempts": 3, "mode": "adaptive"},
            ),
            region_name="auto",
        )
        logger.info("R2 Storage initialized — bucket=%s, endpoint=%s", bucket_name, endpoint_url)

    def generate_presigned_upload_url(
        self,
        file_name: str,
        file_type: str,
        folder: str = "uploads",
    ) -> dict:
        if file_type not in ALLOWED_TYPES:
            raise ValueError(f"File type '{file_type}' not allowed. Allowed: {list(ALLOWED_TYPES.keys())}")

        ext = ALLOWED_TYPES[file_type]
        date_prefix = datetime.now(timezone.utc).strftime("%Y/%m/%d")
        unique_id = uuid.uuid4().hex[:16]
        safe_name = "".join(c for c in file_name.rsplit(".", 1)[0] if c.isalnum() or c in "-_")[:50]
        object_key = f"{folder}/{date_prefix}/{unique_id}_{safe_name}.{ext}"

        try:
            presigned_url = self._client.generate_presigned_url(
                "put_object",
                Params={
                    "Bucket": self._bucket,
                    "Key": object_key,
                    "ContentType": file_type,
                },
                ExpiresIn=PRESIGNED_URL_EXPIRY,
            )
        except ClientError as exc:
            logger.error("Failed to generate presigned URL: %s", exc)
            raise

        return {
            "upload_url": presigned_url,
            "object_key": object_key,
            "expires_in": PRESIGNED_URL_EXPIRY,
            "public_url": self.get_public_url(object_key),
        }

    def get_public_url(self, object_key: str) -> str:
        if self._public_domain:
            domain = self._public_domain.rstrip("/")
            return f"{domain}/{object_key}"
        return f"https://{self._bucket}.r2.dev/{object_key}"


def create_r2_storage() -> R2Storage | None:
    account_id = os.getenv("R2_ACCOUNT_ID", "")
    access_key = os.getenv("R2_ACCESS_KEY", "")
    secret_key = os.getenv("R2_SECRET_KEY", "")
    bucket_name = os.getenv("R2_BUCKET_NAME", "")

    if not all([account_id, access_key, secret_key, bucket_name]):
        logger.warning("R2 credentials not configured — media upload disabled")
        return None

    return R2Storage(
        account_id=account_id,
        access_key=access_key,
        secret_key=secret_key,
        bucket_name=bucket_name,
        public_domain=os.getenv("R2_PUBLIC_DOMAIN"),
    )
