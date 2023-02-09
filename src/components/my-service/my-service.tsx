import { Component, Host, h, State, Event, EventEmitter, Element, Prop } from "@stencil/core";

export interface StepData {
  step: number;
  data: any;
  name: string;
}

@Component({
  tag: "my-service",
  styleUrl: "my-service.css",
})
export class MyService {
  @State() selectedServicesIds = [];
  @State() loading: boolean = true;
  @State() error: boolean = false;
  @State() services = [];
  @Event() stepChange: EventEmitter<StepData>;
  @Element() domService;
  @Prop() token_api: string;

  async componentDidLoad() {

    let res = await fetch(
      `https://app.clubmaster.org/api/v1/products?api=${this.token_api}`
    );
    let response = await res.json();
    this.services = response.result;
    this.loading = false;

  }

  checkPP(e, id) {
    if (!this.selectedServicesIds.includes(id)) {
      this.selectedServicesIds = [...this.selectedServicesIds, id];
    } else {
      this.selectedServicesIds = this.selectedServicesIds.filter(
        (el) => el !== id
      );
    }
    e.stopPropagation();
    let checkParentNode = this.domService.querySelector(`#service${id}`)
    let checkBox = checkParentNode.querySelector('.checkbox')
    if (!(e.target.className === "checkbox")) {
      checkBox.checked = !checkBox.checked;
    }
  }

  onPickTime() {
    if (this.selectedServicesIds.length === 0) {
      this.error = true;
    }
    else {
      let selectedServices = this.services.filter((el) =>
        this.selectedServicesIds.includes(el.id)
      );
      this.stepChange.emit({ step: 2, data: selectedServices, name: "services" });
    }

  }
  render() {
    return (
      <Host>
        {this.loading ? <my-loader></my-loader> : (
          <div
            class="ser"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
            }}
          >
            <div style={{ height: "100%" }}>
              <h2 class="h2">Services</h2>
              <ul id="style-1" class="services">
                {this.error && (
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
                      <p>
                        You need to select at least a single product, click on the
                        product name to buy it
                    </p>
                    </div>
                  </li>
                )}
                {this.services.map((service) => (
                  <li class="service" id={`service${service.id}`} onClick={(e) => this.checkPP(e, service.id)}>
                    <div class="box-services">
                      <div class="left-service">
                        <div class="title-service">{service.name}</div>
                        <div class="desc-service">{service.description}</div>
                        <div class="tag-services">
                          <div class="duration">{service.duration} Min</div>
                          <div class="price">{service.price} {service.currency}</div>
                        </div>
                      </div>
                      <div class="right-service">
                        <input
                          type="checkbox"
                          value={service.name}
                          onChange={e => {
                            e.preventDefault()
                            e.stopPropagation();
                            return false;
                          }}
                          class="checkbox"
                        />
                        <label>
                          <span></span>
                        </label>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div class="btn-con">
              <div class="cont-button">
                <button
                  type="button"
                  class="button"
                  onClick={() => this.onPickTime()}
                >
                  Pick Time
              </button>
              </div>
            </div>
          </div>)}

      </Host>
    );
  }
}
