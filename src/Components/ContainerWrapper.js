function ContainerWrapper(props) {
  return <div className="container shadow-sm p-3 mb-5 bg-body rounded">{props.children}</div>;
}


export default ContainerWrapper;