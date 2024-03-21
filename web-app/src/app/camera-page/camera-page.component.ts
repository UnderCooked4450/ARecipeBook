import { Component, OnInit } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { WebcamModule } from 'ngx-webcam';
import { FormsModule } from '@angular/forms';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { CommonModule } from '@angular/common';
import { environment } from '../environment'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-camera-page',
  standalone: true,
  imports: [WebcamModule, FormsModule, CommonModule],
  templateUrl: './camera-page.component.html',
  styleUrl: './camera-page.component.css',
})
export class CameraPageComponent implements OnInit {
  constructor(private http: HttpClient ,private router: Router) {}
  private baseUrl = environment.apiUrl;
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
  public webcamImage: any;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to ne xt / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  sysImage = '';

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  public triggerSnapshot(): void {
    this.trigger.next(void 0);
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
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsBase64;
    this.router.navigate(['/ml-results', this.webcamImage]);
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
