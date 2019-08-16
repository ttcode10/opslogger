import { LogService } from './../../services/log.service';
import { Log } from './../../models/log';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  loaded: boolean = false;
  selectedId: string;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });

    this.logService.getSourceLog().subscribe(log => {
      this.selectedId = log.id
    });
  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
  }

  deleteLog(log: Log) {
    if(confirm(`Are you sure to delete "${log.text}" ?`)) {
      this.logService.deleteLog(log);
      this.logService.setFormLog({id: null, text: null, date: null});
    }
  }

}
