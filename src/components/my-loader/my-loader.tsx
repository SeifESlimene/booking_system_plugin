import { Component, ComponentInterface, Host, h } from "@stencil/core";

@Component({
  tag: "my-loader",
  styleUrl: "my-loader.css",
  shadow: true,
})
export class MyLoader implements ComponentInterface {
  render() {
    return (
      <Host>

        <div>
          <div class="multi-spinner-container">
            <div class="multi-spinner">
              <div class="multi-spinner">
                <div class="multi-spinner">
                  <div class="multi-spinner">
                    <div class="multi-spinner">
                      <div class="multi-spinner">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
