import { Component, createRef } from "react";
import { glossary } from "../lib/glossary";
import Link from "next/link";
import { withRouter } from "next/router";
import { configure, HotKeys } from "react-hotkeys";
import classnames from "classnames";

{
  /* const SearchContext = createContext(); */
}

const glossarySearch = (query) => {
  return glossary.filter((entry) => {
    return query.toLowerCase() === entry.name || entry.symbol === query;
  });
};

function GlossaryResult(props) {
  const selectedClassnames = classnames({
    "bg-green": props.selected,
  });

  const codeBg = classnames({
    "bg-wall": !props.selected,
    "bg-washedWhite": props.selected,
  });

  const text = classnames({
    "text-black": !props.selected,
    "text-white": props.selected,
  });

  return (
    <button
      tabIndex={props.index}
      id={props.link + "-" + props.index}
      className={`cursor-pointer flex text-left w-full ${selectedClassnames}`}
      onMouseEnter={() => props.setCursor(props.index)}
      onClick={() => props.onSelect()}
    >
      <div className="font-semibold p-3">
        <p className={`text-base ${text}`}>
          {props.symbol.length > 0 && (
            <code className={`mr-1 rounded px-1 py-0.5 ${codeBg}`}>
              {props.symbol}
            </code>
          )}
          {props.name}
        </p>
        <p className={`font-normal text-base mt-1 ${text}`}>{props.desc}</p>
      </div>
    </button>
  );
}

function Result(props) {
  const selectedClassnames = classnames({
    "bg-green": props.selected,
  });
  const text = classnames({
    "text-black": !props.selected,
    "text-white": props.selected,
  });
  const description = classnames({
    "text-gray": !props.selected,
    "text-midWhite": props.selected,
  });
  return (
    <button
      tabIndex={props.index}
      id={props.slug + "-" + props.index}
      className={`cursor-pointer flex text-left w-full ${selectedClassnames}`}
      onMouseEnter={() => props.setCursor(props.index)}
      onClick={() => props.onSelect()}
    >
      <div className="p-3">
        <p className={`font-medium text-base ${text}`}>
          {props.parent !== "Content" ? `${props.parent} /` : ""} {props.title}
        </p>
        <p
          className={`text-base font-regular text-small text-gray ${description}`}
        >
          {props.content}
        </p>
      </div>
    </button>
  );
}

function Subheading(props) {
  return (
    <div className="sticky top-0 flex font-semibold text-sm p-3 py-1 w-full bg-ultraDeepWall text-white">
      <p className="font-semibold text-sm">{props.title}</p>
    </div>
  );
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      active: false,
      results: [],
      cursor: 0,
    };
    this.scrollBox = createRef();
    this.searchEndpoint = this.searchEndpoint.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onNavUp = this.onNavUp.bind(this);
    this.onNavDown = this.onNavDown.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.setCursor = this.setCursor.bind(this);
  }

  searchEndpoint(query) {
    return `/api/search?q=${this.state.query}`;
  }

  onChange(event) {
    const query = event.target.value;
    this.setState({ query });

    if (query.length) {
      fetch(this.searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          // Wrap results in an object which will tell React what component to use to render results.
          const results = res.results.map((item) => ({
            type: "RESULT",
            content: item,
          }));

          const glossaryResults = glossarySearch(query).map((item) => ({
            type: "GLOSSARY_RESULT",
            content: item,
          }));

          const list = [...glossaryResults, ...results];

          this.setState({ results: list });
        });
    } else {
      this.setState({ results: [] });
    }
  }

  onFocus() {
    this.setState({ active: true });
  }

  onNavUp(event) {
    // prevents cursor from moving in search input
    event.preventDefault();
    this.setState({ cursor: this.state.cursor - 1 });
  }

  onNavDown(event) {
    const offset = this[`result-${this.state.cursor}`].offsetTop;
    const height = this[`result-${this.state.cursor}`].clientHeight;

    this.scrollBox.current.scrollTop = offset - height;
    console.log(offset - height);

    {
      /* const elem = this[`result-${this.state.cursor}`] */
    }

    {
      /* console.log(elem) */
    }
    // prevents cursor from moving in search input
    {
      /* console.log(this[`result-${this.state.cursor}`].offsetTop) */
    }
    {
      /* this.scrollBox.scrollTop = this[`result-${this.state.cursor}`].offsetTop */
    }
    {
      /* this[`result-${this.state.cursor}`].scrollIntoView({behavior: 'smooth'}); */
    }
    {
      /* this[`result-${this.state.cursor}`].offsetTop = 0 */
    }

    {
      /* this[`result-${this.state.cursor}`].scrollIntoView(); */
    }
    {
      /* elem.scrollTop = 0; */
    }
    event.preventDefault();
    this.setState({ cursor: this.state.cursor + 1 });
  }

  onSelect(event) {
    const { state, props } = this;
    const cursorItem = state.results[state.cursor].content;

    if (cursorItem.link) {
      window.location.href = cursorItem.link;
    }

    if (cursorItem.slug) {
      props.router.push(cursorItem.slug);
    }

    this.setState({
      active: false,
      query: "",
      results: [],
    });

    props.closeSearch();
  }

  setCursor(num) {
    this.setState({ cursor: num });
  }

  applyRef(index, ref) {
    this[`result-${index}`] = ref;
  }

  render() {
    const { state, props } = this;

    const keyMap = {
      onNavUp: ["up"],
      onNavDown: ["down"],
      onSelect: ["enter"],
    };

    const handlers = {
      onNavUp: (event) => this.onNavUp(event),
      onNavDown: (event) => this.onNavDown(event),
      onSelect: (event) => this.onSelect(event),
    };

    if (props.showSearch) {
      return (
        <HotKeys handlers={handlers} keyMap={keyMap}>
          <div
            onClick={props.closeSearch}
            className="fixed w-screen h-screen bg-washedWall z-50 flex flex-col items-center p-4"
          >
            <div className="relative flex flex-col max-w-screen-lg md:my-32 w-full md:w-10/12 lg:w-8/12 xl:w-6/12 rounded-xl bg-white min-h-0 overflow-hidden">
              <div className="relative">
                <input
                  className="text-lg md:text-xl lg:text-2xl font-medium text-green bg-transparent py-2 px-4 outline-none relative w-full"
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  placeholder="Search..."
                  type="text"
                  value={state.query}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus={true}
                />

                <span
                  onClick={props.toggleSearch}
                  className="absolute cursor-pointer right-1.5 top-1.5 md:right-2 md:top-2 lg:right-2.5 lg:top-2.5"
                >
                  <p className="px-2 h-8 bg-wall flex items-center justify-center text-sm rounded">
                    ESC
                  </p>
                </span>
              </div>

              <div
                ref={this.scrollBox}
                className={
                  "overflow-y-scroll border-t-2 border-wall" +
                  (state.query.length > 0 ? "" : "hidden border-transparent")
                }
              >
                {state.active && state.query !== ""
                  ? state.results.map((item, index) => {
                      if (item.type === "GLOSSARY_RESULT") {
                        return (
                          <div ref={this.applyRef.bind(this, index)}>
                            <GlossaryResult
                              key={item.content.link + "-" + index}
                              index={index}
                              setCursor={this.setCursor}
                              selected={index === state.cursor}
                              onSelect={this.onSelect}
                              {...item.content}
                            />
                          </div>
                        );
                      }

                      if (item.type === "RESULT") {
                        return (
                          <div ref={this.applyRef.bind(this, index)}>
                            <Result
                              key={item.content.slug + "-" + index}
                              index={index}
                              setCursor={this.setCursor}
                              selected={index === state.cursor}
                              onSelect={this.onSelect}
                              {...item.content}
                            />
                          </div>
                        );
                      }
                      return null;
                    })
                  : null}
              </div>
            </div>
          </div>
        </HotKeys>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(Search);
