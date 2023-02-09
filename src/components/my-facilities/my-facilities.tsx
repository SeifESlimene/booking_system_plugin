import { Component, Host, h, State, Event, EventEmitter, Prop } from "@stencil/core";

export interface StepData {
  step: number;
  data: any;
  name: string;
}

@Component({
  tag: "my-facilities",
  styleUrl: "my-facilities.css",
})
export class MyFacilities {
  @State() error: boolean = false;
  @State() facilities = [];
  @State() loading: boolean = true;
  @Event() stepChange: EventEmitter<StepData>;
  @Prop() token_api: string;

  async componentDidLoad() {
    let res = await fetch(
      `https://app.clubmaster.org/api/v1/facilities?api=${this.token_api}`
    );
    let response = await res.json();
    this.facilities = response.result;
    this.loading = false;
  }

  onPickFacility(facility) {
    this.stepChange.emit({ step: 3, data: facility, name: "facility" });
  }

  render() {
    return (
      <Host>
        {this.loading ? (
          <my-loader></my-loader>
        ) : (
          <div style={{ height: "100%" }}>
            <h2 class="h2">Facilities</h2>
            <div class="container" id="style-1">
              {this.facilities.map((facility) => (
                <div
                  class="facility"
                  onClick={() => this.onPickFacility(facility)}
                >
                  <span class="title">{facility.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Host>
    );
  }
}
