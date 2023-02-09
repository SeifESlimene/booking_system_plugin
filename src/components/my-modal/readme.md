# my-modal



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [my-component](../my-component)

### Depends on

- [my-service](../my-service)
- [my-facilities](../my-facilities)
- [my-calendar](../my-calendar)
- [my-form](../my-form)
- [my-confirm](../my-confirm)

### Graph
```mermaid
graph TD;
  my-modal --> my-service
  my-modal --> my-facilities
  my-modal --> my-calendar
  my-modal --> my-form
  my-modal --> my-confirm
  my-service --> my-loader
  my-facilities --> my-loader
  my-calendar --> my-loader
  my-confirm --> my-loader
  my-component --> my-modal
  style my-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
