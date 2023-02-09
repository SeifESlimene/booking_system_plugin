# my-component



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [my-modal](../my-modal)
- [my-button](../my-button)

### Graph
```mermaid
graph TD;
  my-component --> my-modal
  my-component --> my-button
  my-modal --> my-service
  my-modal --> my-facilities
  my-modal --> my-calendar
  my-modal --> my-form
  my-modal --> my-confirm
  my-service --> my-loader
  my-facilities --> my-loader
  my-calendar --> my-loader
  my-confirm --> my-loader
  style my-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
