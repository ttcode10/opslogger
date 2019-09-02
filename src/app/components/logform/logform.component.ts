import { Log } from './../../models/log';
import { LogService } from './../../services/log.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logform',
  templateUrl: './logform.component.html',
  styleUrls: ['./logform.component.css']
})
export class LogformComponent implements OnInit {
  private id: string;
  private text: string;
  private date: any;
  public isNew: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.getSourceLog().subscribe(log => {
      if(!!log.id) {
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
        this.isNew = false;
      } else {
        this.id = null;
        this.text = null;
        this.date = null;
        this.isNew = true;
      }
    });
  }

  onSubmit() {
    if(!!this.text) {
      if(this.isNew === true) {
        const newLog = {
          id: this.generateID(),
          text: this.text,
          date: new Date()
        }
        this.logService.addLog(newLog);
        // this.clearState();
      } else {
        const updatedLog = {
          id: this.id,
          text: this.text,
          date: new Date()
        }
        this.logService.updateLog(updatedLog);
        // this.clearState();
      }
    }
    this.logService.setFormLog({id: null, text: null, date: null});
  }

  generateID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  clearState() {
    this.id = null;
    this.text = null;
    this.date = null;
    this.isNew = true;
  }

}
