import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamModule } from 'ngx-webcam';

@Component({
  selector: 'camera',
  standalone: true,
  imports: [WebcamModule],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css',
})
export class CameraComponent {
  constructor(private router: Router) {}

  video = document.getElementById('video') as HTMLVideoElement;

  openCamera() {
    try {
      //check  if the browser supports getUserMedia api
      if (
        'mediaDevices' in navigator &&
        'getUserMedia' in navigator.mediaDevices
      ) {
        console.log('camera time');
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            this.video.srcObject = stream;
          })
          .catch((error) => {
            console.log('Error: ' + error);
          });

        navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: 'user',
          },
        });
      }
    } catch (error) {
      alert('Error accessing the camera and microphone');
      console.error(error);
    }
  }
}
