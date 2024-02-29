import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { WebcamModule } from 'ngx-webcam';
import { FormsModule } from '@angular/forms';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camera-page',
  standalone: true,
  imports: [WebcamModule, FormsModule, CommonModule],
  templateUrl: './camera-page.component.html',
  styleUrl: './camera-page.component.css',
})
export class CameraPageComponent implements OnInit {
  constructor(private router: Router) {}

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string = '';
  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 1024 },
    height: { ideal: 576 },
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage | undefined;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to ne xt / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage as WebcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
