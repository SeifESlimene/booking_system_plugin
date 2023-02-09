import {
  Component,
  ComponentInterface,
  Host,
  h,
  State,
  Listen,
  Prop,
} from "@stencil/core";

export interface StepData {
  step: number;
  data: any;
  name: string;
}

@Component({
  tag: "my-modal",
  styleUrl: "my-modal.css",
  shadow: true,
})
export class MyModal implements ComponentInterface {
  @State() step: number = 1;
  @State() modalData = {
    services: [],
    facility: { id: "" },
    selectedTime: '',
    userData: null,
  };
  @Prop() token: string;

  progress() {
    const MAX_STEPS_NUMBER = 5;
    return Math.round(100 / MAX_STEPS_NUMBER) * this.step + "%";
  }

  @Listen("stepChange")
  setStep(e) {
    this.step = e.detail.step;
    this.modalData[e.detail.name] = e.detail.data;
  }

  render() {
    return (
      <Host>
        <div class="progress" style={{ width: this.progress() }}></div>
        {this.step === 1 && <my-service token_api={this.token}></my-service>}
        {this.step === 2 && <my-facilities token_api={this.token}></my-facilities>}
        {this.step === 3 && (
          <my-calendar facilityId={this.modalData.facility.id} token_api={this.token}></my-calendar>
        )}
        {this.step === 4 && <my-form selectedTime={this.modalData.selectedTime}></my-form>}
        {this.step === 5 && <my-confirm modalData={this.modalData} token_api={this.token}></my-confirm>}
      </Host>
    );
  }
}
