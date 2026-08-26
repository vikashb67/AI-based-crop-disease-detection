# Simple predict.py stub for the model. Pranav should replace this with the real model invocation.
import base64
from io import BytesIO
from PIL import Image, ImageDraw


def predict(image_bytes: bytes):
    """
    Accepts image bytes and returns a dict with:
      disease (str), confidence (float 0-1), severity (LOW/MEDIUM/HIGH), description (str), treatment (list), optional mask_bytes (PNG bytes)
    """
    # Placeholder: always returns a demo disease
    disease = "Tomato Early Blight"
    confidence = 0.9
    severity = "HIGH"
    description = "This disease affects the leaves and spreads quickly in wet weather. Act within 2 to 3 days."
    treatment = [
        "Remove and destroy affected leaves",
        "Apply Mancozeb fungicide per label instructions",
        "Avoid overhead watering"
    ]

    # Create a dummy mask: draw a red circle on transparent background same size as image
    try:
        img = Image.open(BytesIO(image_bytes)).convert('RGBA')
        w, h = img.size
        mask = Image.new('RGBA', (w, h), (0,0,0,0))
        draw = ImageDraw.Draw(mask)
        # draw ellipse roughly center
        draw.ellipse((w*0.2, h*0.2, w*0.8, h*0.8), fill=(255,0,0,100))
        buf = BytesIO()
        mask.save(buf, format='PNG')
        mask_bytes = buf.getvalue()
    except Exception:
        mask_bytes = None

    return {
        'disease': disease,
        'confidence': confidence,
        'severity': severity,
        'description': description,
        'treatment': treatment,
        'mask_bytes': mask_bytes
    }
