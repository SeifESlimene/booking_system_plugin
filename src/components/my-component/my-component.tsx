import { Component, State, h, Prop } from "@stencil/core";

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true
})
export class MyComponent {
  @State() expanded: boolean = false;
  @Prop() api: string;

  render() {
    return (
      <div>
        {this.expanded && <my-modal token={this.api}></my-modal>}
        <my-button
          onClick={() => (this.expanded = !this.expanded)}
          buttonExpanded={!this.expanded}
        ></my-button>
      </div>
    );
  }
}
