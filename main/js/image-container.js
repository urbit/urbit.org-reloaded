window.tree.actions.registerComponent("image-container", React.createClass({
  displayName: "ImageContainer",
  render: function(){
    return React.DOM.div({
      className:"image-container",
      style:{backgroundImage:"url('"+this.props.src+"')"}
    });
  }
}))
