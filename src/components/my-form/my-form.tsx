import {
  Component,
  ComponentInterface,
  Host,
  h,
  Prop,
  State,
  Event,
  EventEmitter,
} from "@stencil/core";

import moment from "moment";

export interface StepData {
  step: number;
  data: any;
  name: string;
}

@Component({
  tag: "my-form",
  styleUrl: "my-form.css",
  shadow: true,
})
export class MyForm implements ComponentInterface {
  @State() error: boolean = false;
  @Prop() selectedTime;
  @State() userData = {
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    note: "",
  };
  @State() loading: boolean = false;
  @Event() stepChange: EventEmitter<StepData>;

  handleChange(e) {
    if (e.target.value) {
      this.userData = { ...this.userData, [e.target.name]: e.target.value };
    } else {
      this.userData = { ...this.userData, [e.target.name]: null };
    }
  }

  confirm() {
    if (
      !this.userData.firstname ||
      !this.userData.lastname ||
      !this.userData.email ||
      !this.userData.phonenumber
    ) {
      this.error = true;
    } else {
      this.stepChange.emit({ step: 5, data: this.userData, name: "userData" });
    }
  }

  render() {
    return (
      <Host>
        <div class="form" style={{ height: "100%" }}>
          <h2 class="form-header">Enter your details</h2>
          <p class="form-description">
            Please provide your contact information to get notified in case of
            changes
          </p>

          <div id="style-1" class="form-inside">
            <div>
              {this.error && (
                <ul id="style-1" class="services">
                  <li class="alert alert-danger">
                    <div>
                      <h2>
                        <svg
                          version="1.1"
                          id="Layer_1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 512 512"
                          width="25"
                          height="25"
                          style={{
                            fill: "white",
                            marginRight: "8px",
                            marginTop: "-8px",
                            marginBottom: "-3px",
                          }}
                        >
                          <g>
                            <g>
                              <path d="M505.403,406.394L295.389,58.102c-8.274-13.721-23.367-22.245-39.39-22.245c-16.023,0-31.116,8.524-39.391,22.246    L6.595,406.394c-8.551,14.182-8.804,31.95-0.661,46.37c8.145,14.42,23.491,23.378,40.051,23.378h420.028    c16.56,0,31.907-8.958,40.052-23.379C514.208,438.342,513.955,420.574,505.403,406.394z M477.039,436.372    c-2.242,3.969-6.467,6.436-11.026,6.436H45.985c-4.559,0-8.784-2.466-11.025-6.435c-2.242-3.97-2.172-8.862,0.181-12.765    L245.156,75.316c2.278-3.777,6.433-6.124,10.844-6.124c4.41,0,8.565,2.347,10.843,6.124l210.013,348.292    C479.211,427.512,479.281,432.403,477.039,436.372z" />
                            </g>
                          </g>
                          <g>
                            <g>
                              <path d="M256.154,173.005c-12.68,0-22.576,6.804-22.576,18.866c0,36.802,4.329,89.686,4.329,126.489    c0.001,9.587,8.352,13.607,18.248,13.607c7.422,0,17.937-4.02,17.937-13.607c0-36.802,4.329-89.686,4.329-126.489    C278.421,179.81,268.216,173.005,256.154,173.005z" />
                            </g>
                          </g>
                          <g>
                            <g>
                              <path d="M256.465,353.306c-13.607,0-23.814,10.824-23.814,23.814c0,12.68,10.206,23.814,23.814,23.814    c12.68,0,23.505-11.134,23.505-23.814C279.97,364.13,269.144,353.306,256.465,353.306z" />
                            </g>
                          </g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                        </svg>
                        Alert!
                      </h2>
                      <p>You need to select at input all required fields!</p>
                    </div>
                  </li>
                </ul>
              )}

              <div class="input td">
                <div class="input-inside tdc">
                  <label class="input-1 g">Selected Date</label>
                  <p class="dtp">
                    {moment(this.selectedTime.start).format("YYYY-MM-DD")}
                  </p>
                </div>
                <div class="input-inside tdc">
                  <label class="input-1 g">Selected Time</label>
                  <p class="dtp">
                    {moment(this.selectedTime.start)
                      .utcOffset(60)
                      .format("hh:mm A")}
                  </p>
                </div>
              </div>
            </div>
            <div class="form-inside1">
              <form class="form-inside2">
                <div class="input">
                  <div class="input-inside">
                    <label class="input-1">
                      First name<span class="star">*</span>
                    </label>
                    <label>
                      <div class="input-input">
                        <input
                          type="text"
                          autocomplete="given-name"
                          name="firstname"
                          maxlength="50"
                          class="input-text"
                          value={this.userData.firstname}
                          onInput={(e) => this.handleChange(e)}
                        />
                        <span class="input-margin" />
                      </div>
                    </label>

                    {!this.userData.firstname && (
                      <div>
                        <div class="error">- Mandatory field</div>
                      </div>
                    )}
                  </div>
                </div>
                <div class="input">
                  <div class="input-inside">
                    <label class="input-1">
                      Last name<span class="star">*</span>
                    </label>
                    <label>
                      <div class="input-input">
                        <input
                          type="text"
                          autocomplete="family-name"
                          maxlength="50"
                          class="input-text"
                          name="lastname"
                          value={this.userData.lastname}
                          onInput={(e) => this.handleChange(e)}
                        />
                        <span class="input-margin" />
                      </div>
                    </label>
                    {!this.userData.lastname && (
                      <div>
                        <div class="error">- Mandatory field</div>
                      </div>
                    )}
                  </div>
                </div>
                <div class="input">
                  <div class="input-inside">
                    <label class="input-1">
                      Email<span class="star">*</span>
                    </label>
                    <label>
                      <div class="input-input">
                        <input
                          pattern="[^ @]*@[^ @]*"
                          type="email"
                          autocomplete="email"
                          class="input-text"
                          name="email"
                          value={this.userData.email}
                          onInput={(e) => this.handleChange(e)}
                        />
                        <span class="input-margin" />
                      </div>
                      {!this.userData.email && (
                        <div>
                          <div class="error">- Mandatory field</div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                <div class="input">
                  <div class="input-inside">
                    <label class="input-1">
                      Mobile number<span class="star">*</span>
                    </label>
                    <label>
                      <div class="input-input">
                        <input
                          type="tel"
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          autocomplete="false"
                          class="input-text"
                          name="phonenumber"
                          value={this.userData.phonenumber}
                          onInput={(e) => this.handleChange(e)}
                        />
                        <span class="input-margin" />
                      </div>
                    </label>
                    {!this.userData.phonenumber && (
                      <div>
                        <div class="error">- Mandatory field</div>
                      </div>
                    )}
                  </div>
                </div>
                <div class="input">
                  <div class="input-inside">
                    <label class="input-1">Comments</label>
                    <label>
                      <div class="input-input">
                        <textarea
                          id="input-undefined"
                          class="textarea"
                          value={this.userData.note}
                          name="note"
                          onInput={(e) => this.handleChange(e)}
                          // style={{ maxWidth: "386px", minWidth: "386px" }}
                        />
                        <span class="input-margin" />
                      </div>
                    </label>
                  </div>
                </div>
                <div class="input">
                  <button
                    type="button"
                    class="button"
                    onClick={() => this.confirm()}
                  >
                    Submit
                  </button>
                </div>
                <div class="">
                  Fields marked with <span class="star">*</span> are required
                </div>
              </form>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
