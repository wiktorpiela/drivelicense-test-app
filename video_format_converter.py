import os
from moviepy import editor

video_files_path = os.path.join(os.getcwd(), r"frontend/static/video/")
all_files = os.listdir(video_files_path)

counter = 0
for file in all_files:
    if file[-3:] == "wmv":
        clip = editor.VideoFileClip(video_files_path+file)
        clip.write_videofile(video_files_path+file[:-3]+"mp4")
        counter+=1
