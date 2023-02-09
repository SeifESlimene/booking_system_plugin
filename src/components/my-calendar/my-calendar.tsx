import {
  Component,
  Host,
  h,
  State,
  Element,
  Prop,
  Event,
  EventEmitter,
} from "@stencil/core";
import flatpickr from "flatpickr";
import moment from "moment";

export interface StepData {
  step: number;
  data: any;
  name: string;
}

@Component({
  tag: "my-calendar",
  styleUrl: "my-calendar.css",
  // scoped: true
})
export class MyCalendar {
  @Prop() facilityId;
  @State() date = [];
  @State() times = [];
  @State() selectedDate = new Date();
  @Element() domService: HTMLElement;
  @Event() stepChange: EventEmitter<StepData>;
  @State() loading: boolean = true;
  @State() loading2: boolean = false;
  @Prop() token_api: string;

  async componentDidRender() {
    const myInput = this.domService.querySelector("#calendar");
    const fp = flatpickr(myInput, {
      inline: true,
      onChange: async (selectedDates) => {
        this.loading2 = true;
        const someday = moment(selectedDates[0]);
        const diff = someday.format("YYYY-MM-DD");
        let res = await fetch(
          `https://app.clubmaster.org/api/v1/facilities/${this.facilityId}/available?api=${this.token_api}&start=${diff}&end=${diff}&duration=60`
        );
        let response = await res.json();
        this.times = await response.unique;
        if (this.loading2) {
          this.loading2 = false;
        }
        this.selectedDate = selectedDates[0];
      },
      disable: [
        function (date) {
          const today = new Date()
          const yesterday = new Date(today)
          yesterday.setDate(yesterday.getDate() - 1)
          return date < yesterday;
        },
      ],
      // enable: [
      //   function (date) {
      //     const today = moment(new Date(), "DD/MM/YYYY");
      //     const datee = moment(date, "DD/MM/YYYY");
      //     return (datee >= today);
      //   }
      // ],
      defaultDate: this.selectedDate,
    }).calendarContainer;

    myInput.append(fp);
    myInput.appendChild(fp);
  }

  async componentDidLoad() {
    const someday = moment(new Date());
    const diff = someday.format("YYYY-MM-DD");
    let res = await fetch(
      `https://app.clubmaster.org/api/v1/facilities/${this.facilityId}/available?api=${this.token_api}&start=${diff}&end=${diff}&duration=60`
    );
    let response = await res.json();
    this.times = await response.unique;
    if (this.loading) {
      this.loading = false;
    }
  }
  render() {
    return (
      <Host style={{ width: "100%" }}>
        {this.loading ? (
          <my-loader></my-loader>
        ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                height: "100%",
              }}
            >
              <div>
                <h2 class="h2">Choose Date and Time</h2>
                <div id="calendar"></div>
                {this.loading2 ? (
                  <my-loader class="load"></my-loader>
                ) : (
                    <div class="container">
                      {this.times && this.times.map((time) => (
                        <div
                          class="time ser"
                          onClick={() =>
                            this.stepChange.emit({
                              step: 4,
                              data: time,
                              name: "selectedTime",
                            })
                          }
                        >
                          <span>
                            {!(time.is_past) && moment(time.start).utcOffset(60).format("hh:mm A")}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          )}
      </Host>
    );
  }
}
