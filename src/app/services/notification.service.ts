import { Injectable } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  private configuration(extraTime?: number): Partial<IndividualConfig> {
    const time = extraTime ? 2000 + extraTime : 2000;
    return {
      enableHtml: true,
      progressBar: true,
      timeOut: time,
      extendedTimeOut: 2000,
      positionClass: 'toast-bottom-left',
    };
  }

  private message(messages: string | string[]): string {
    return Array.isArray(messages) ? messages.join('<br/>') : messages;
  }

  public success(
    messages: string | string[],
    title?: string,
    configuration?: Partial<IndividualConfig>,
    extraTime?: number
  ): ActiveToast<string> {
    extraTime
      ? (configuration = this.configuration(extraTime))
      : (configuration = this.configuration());
    return this.toastr.success(this.message(messages), title, configuration);
  }

  public error(
    messages: string | string[],
    title?: string,
    configuration?: Partial<IndividualConfig>,
    extraTime?: number
  ): ActiveToast<string> {
    extraTime
      ? (configuration = this.configuration(extraTime))
      : (configuration = this.configuration());
    configuration.enableHtml = true;
    return this.toastr.error(this.message(messages), title, configuration);
  }

  public warning(
    messages: string | string[],
    title?: string,
    configuration?: Partial<IndividualConfig>,
    extraTime?: number
  ): ActiveToast<string> {
    extraTime
      ? (configuration = this.configuration(extraTime))
      : (configuration = this.configuration());
    return this.toastr.warning(this.message(messages), title, configuration);
  }

  public info(
    messages: string | string[],
    title?: string,
    configuration?: Partial<IndividualConfig>,
    extraTime?: number
  ): ActiveToast<string> {
    extraTime
      ? (configuration = this.configuration(extraTime))
      : (configuration = this.configuration());
    return this.toastr.info(this.message(messages), title, configuration);
  }
}
