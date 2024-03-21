import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  constructor(private router: Router) {}
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  countdown: any;
  timerDisplay: string = '';
  isTimerRunning: boolean = false;
  @ViewChild('audioPlayer') audioPlayer!: HTMLAudioElement;

  toggleTimer(): void {
    if (this.isTimerRunning) {
      this.countdown.unsubscribe();
    } else if (this.getTotalTime() == 0) {
      alert('Invalid time entered');
      return;
    } else {
      this.startTimer();
    }
    this.isTimerRunning = !this.isTimerRunning;
  }

  getTotalTime(): number {
    var totalTime =
      (this.hours * 3600 + this.minutes * 60 + this.seconds) * 1000;
    return totalTime;
  }

  startTimer(): void {
    var remainingTime = this.getTotalTime();
    this.displayTime(remainingTime);

    // Start the countdown
    this.countdown = interval(1000).subscribe(() => {
      remainingTime -= 1000;
      console.log(remainingTime);
      this.displayTime(remainingTime);

      if (remainingTime <= 0) {
        this.isTimerRunning = !this.isTimerRunning;
        this.countdown.unsubscribe();
        this.playSound();
      }
    });
  }

  displayTime(time: number): void {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    this.timerDisplay = `${hours}h ${minutes}m ${seconds}s`;
  }

  playSound(): void {
    //this.audioPlayer.play();
    alert('Ding ding!! Your timer is finished!');
  }

  home() {
    this.router.navigate(['/homepage']);
  }
}
