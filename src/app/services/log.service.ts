import { Observable, of, BehaviorSubject } from 'rxjs';
import { Log } from './../models/log';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LogService {
  logs: Log[];

  private logSource$ = new BehaviorSubject<Log>({id: null, text: null, date: null});

  setFormLog(log: Log) {
    return this.logSource$.next(log);
  }

  getSourceLog(): Observable<Log> {
    return this.logSource$.asObservable();
  }

  constructor() {
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if(this.logs.length > 0) {
      this.logs = this.getFromLocalStorage();
      this.sortLogs();
    } else {
      this.logs = [];
    }
    return of(this.logs);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    this.saveToLocalStorage();
  }

  updateLog(log: Log) {
    const index = this.logs.findIndex(item => item.id === log.id);
    if(index !== -1) {
      this.logs.splice(index, 1, log);
      this.sortLogs();
      this.saveToLocalStorage();
    } else {
      alert("Someone is updating this log, please try again later");
    }
  }

  sortLogs() {
    this.logs.sort((a, b) => {
      return Date.parse(b.date) - Date.parse(a.date);
    })
  }

  saveToLocalStorage() {
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  getFromLocalStorage(): Log[] {
    return JSON.parse(localStorage.getItem('logs'));
  }

  deleteLog(log: Log) {
    const index = this.logs.findIndex(item => item.id === log.id);
    if(index !== -1) {
      this.logs.splice(index, 1);
      this.saveToLocalStorage();
    } else {
      alert("Someone is updating this log, please try again later");
    }
  }

}
