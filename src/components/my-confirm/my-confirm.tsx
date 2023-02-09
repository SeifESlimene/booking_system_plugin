import {
  Component,
  ComponentInterface,
  Host,
  h,
  State,
  Prop,
  Element
} from "@stencil/core";
import moment from "moment";

@Component({
  tag: "my-confirm",
  styleUrl: "my-confirm.css",
  shadow: true,
})
export class MyConfirm implements ComponentInterface {
  @Prop() modalData;
  @State() status;
  @State() loading: boolean = false;
  @Element() domService;
  @Prop() token_api: string;

  confirm() {
    this.loading = true;
    const payload = {
      ...this.modalData.userData,
      start: this.modalData.selectedTime.start,
      products: this.modalData.services.map((service) => service.id),
      facility: this.modalData.facility.id,
    };
    fetch(
      `https://app.clubmaster.org/api/v1/appointments/create?api=${this.token_api}`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(payload), // body data type must match "Content-Type" header
      }
    )
      .then(() => {

        this.loading = false;
        this.status = "success"
      })
      .catch(() => (this.status = "failure"));
  }

  render() {
    console.log(this.modalData);
    return (
      <Host>






        <div class="summary">
          <div class="summary-services">
            <h2 class="summary-services-title">Summary</h2>
            <p class="summary-services-count">
              {this.modalData.services.length} Services
              </p>
            <ul class="service">
              {this.modalData.services.map((service) => (
                <li class="serviceinner">
                  <dt class="serviceinnerleft">
                    <div class="serviceinnerlefttitle">{service.name}</div>
                  </dt>
                  <dd class="serviceinnerright">{service.price}&nbsp;USD</dd>
                </li>
              ))}
            </ul>
          </div>
          <div class="servicedatatimecontainer">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              width="30"
              height="30"
              data-icon="calendar-check"
              class="svg-inline--fa fa-calendar-check fa-w-14 logotimedate"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M400 64h-48V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H160V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 400H54a6 6 0 0 1-6-6V160h352v298a6 6 0 0 1-6 6zm-52.849-200.65L198.842 404.519c-4.705 4.667-12.303 4.637-16.971-.068l-75.091-75.699c-4.667-4.705-4.637-12.303.068-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l44.104 44.461 111.072-110.181c4.705-4.667 12.303-4.637 16.971.068l22.536 22.718c4.667 4.705 4.636 12.303-.069 16.97z"
              ></path>
            </svg>
            <div class="servicedatatime">
              <p class="datetime">
                {" "}
                {moment(this.modalData.selectedTime.start).format("MMM DD, yyyy")}
              </p>
              <p class="datetime">
                {" "}
                {moment(this.modalData.selectedTime.start).utcOffset(60).format(
                  "HH:mm A"
                )}{" "}
                  to {moment(this.modalData.selectedTime.end).utcOffset(60).format("HH:mm A")}{" "}
                  -{" "}
                {moment(this.modalData.selectedTime.end).diff(
                  moment(this.modalData.selectedTime.start),
                  "hours"
                )}
                  h
                </p>
            </div>
          </div>
          <div class="servicestotalprice">
            <ul class="priceinner">
              <li class="priceinner1">
                <dt class="priceinner1text">Total price:</dt>
                <dd class="priceinner2text">
                  <p class="price3">
                    {this.modalData.services
                      .map((service) => parseInt(service.price))
                      .reduce((a, b) => a + b, 0)}
                      &nbsp;USD
                    </p>
                </dd>
              </li>
            </ul>
          </div>
          {/* {this.loading ? */}
          {this.loading &&
            <my-loader></my-loader>}

          {(this.status !== "success" && !this.loading === true) && (
            <button
              type="button"
              class="confirm-order"
              onClick={() => this.confirm()}
            >
              Confirm Order
            </button>
          )}


        </div>


        {this.status === "success" ? (


          <div class="confirm">
            <div>
              <div class="confirm1">
                <div class="confirm-left">
                  <h1 class="left-text">Order Confirmed</h1>
                </div>
                <div class="confirm1">
                  <p class="textconfirm">
                    Thank you for purchasing our services!
                </p>
                </div>
                <div class="confirm-right">
                  <svg
                    width="72"
                    height="72"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    class="logo-confirm"
                  >
                    <path
                      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14.968A6.967 6.967 0 0 1 1.032 8 6.967 6.967 0 0 1 8 1.032 6.967 6.967 0 0 1 14.968 8 6.967 6.967 0 0 1 8 14.968zm4.569-8.87l-5.822 5.775a.387.387 0 0 1-.548-.002L3.43 9.078a.387.387 0 0 1 .002-.547l.275-.273a.387.387 0 0 1 .548.003l2.225 2.243 5.272-5.23a.387.387 0 0 1 .547.002l.273.275c.15.151.15.396-.002.547z"
                      class="logo-confirm-color"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

          </div>

















        ) : (
            this.status === "failure" ? (
              // { 
              <div class="confirm">an error occurred</div>
              // }
            ) : (<div></div>)

            // {/* // this.loading ? <my-loader></my-loader> : ( */}
            // {/* ) */}


          )}


        {/* } */}
      </Host>
    );
  }
}
