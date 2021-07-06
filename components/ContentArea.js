export default function ContentArea(props) {
  return (
    <div className="w-full min-w-0 flex flex-col">
      <header className="flex justify-between items-center px-24 pt-12 pb-8">
        <div className="type-ui">Urbit Documentation</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.toggleSearch();
          }}
          className="button-sm bg-wall text-gray"
        >
          Search<div className="ml-4 text-lightGray">⌘K</div>
        </button>
      </header>
      <div className="px-24 pb-24 pt-16 flex flex-col w-full max-h-screen h-screen overflow-y-scroll">
        <div className="type-ui text-lightGray">{props.breadcrumbs}</div>
        <h2 className="mb-16 mt-4">{props.title}</h2>
        {props.children}
        <div className="pb-32" />
      </div>
    </div>
  );
}
