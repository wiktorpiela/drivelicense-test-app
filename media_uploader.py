import cloudinary
import cloudinary.uploader
import cloudinary.api
import os
from dotenv import load_dotenv

root_dir = os.getcwd()
img_dir = os.path.join(root_dir, "frontend/static/img")
vid_dir = os.path.join(root_dir, "frontend/static/video")

img_files = os.listdir(img_dir)
vid_files = os.listdir(vid_dir)

load_dotenv()

cloudinary.config( 
  cloud_name = os.environ["CLOUD_NAME"], 
  api_key = os.environ["API_KEY"], 
  api_secret = os.environ["API_SECRET"],
  secure = True
)


# for file in img_files:
#     temp_path = f"{img_dir}/{file}".replace("\\", "/")

#     cloudinary.uploader.upload(temp_path,
#                                use_filename=True, 
#                                unique_filename=False,
#                                folder="drivelicense/img",
#                                resource_type="image")

for file in vid_files:
    temp_path = f"{vid_dir}/{file}".replace("\\", "/")
    
    cloudinary.uploader.upload(temp_path,
                               use_filename=True, 
                               unique_filename=False,
                               folder="drivelicense/video",
                               resource_type="video")



