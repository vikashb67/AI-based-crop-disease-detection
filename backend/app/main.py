from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google.cloud import storage
import predict
import os

app = FastAPI()

# Basic CORS for Firebase hosting domains - update PROJECT_DOMAIN
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get('FRONTEND_URL','https://your-project.web.app')],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class PredictRequest(BaseModel):
    storagePath: str
    imageUrl: str = None
    userId: str = None
    language: str = 'en'

@app.get('/health')
def health():
    return {'status': 'ok'}

@app.post('/predict')
async def predict_route(req: PredictRequest):
    try:
        # Download image bytes from GCS
        client = storage.Client()
        bucket_name = os.environ.get('GCS_BUCKET')
        if not bucket_name:
            raise HTTPException(status_code=500, detail='GCS_BUCKET not configured')
        bucket = client.bucket(bucket_name)
        blob = bucket.blob(req.storagePath)
        image_bytes = blob.download_as_bytes()

        # Call model
        result = predict.predict(image_bytes)
        # Example result: {"disease":"Tomato Early Blight","confidence":0.94,"severity":"HIGH","description":"...","treatment":["..."],"mask_bytes": b'...'}

        # If mask_bytes present, upload mask to storage and return URL
        if result.get('mask_bytes'):
            mask_path = f"masks/{req.userId or 'anon'}/{int(__import__('time').time())}_mask.png"
            mask_blob = bucket.blob(mask_path)
            mask_blob.upload_from_string(result['mask_bytes'], content_type='image/png')
            result['overlay'] = {'maskUrl': mask_blob.public_url}

        # Add imageUrl if provided
        if req.imageUrl:
            result['imageUrl'] = req.imageUrl

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
