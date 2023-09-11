/* The React.createElement() method under the hood
*/

// const element = {
//     type: "h1",
//     props: {
//         title: "foo",
//         children: "hello",
//     }
// }

/* The create element method only creates an object with 2 main properties which 
are the type of dom element we want created and extra properties we want on the element like 
cusmot attributes and the children propertie which can either the text in the element or other elements
*/

// const container = document.getElementById("root")

// const node = document.createElement(element.type)
// node["title"] = element.props.title

// const text = document.createTextNode("")
// text["nodeValue"] = element.props.children

// node.appendChild(text)
// container.appendChild(node)

//
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
        }
    }
}

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function render(element, container) {
    // TODO create dom node
    const dom =
        element.type === "TEXT_ELEMENT"
            ? document.createTextNode("")
            : document.createElement(element.type)

    // assign element props(attributes) to the node
    const isProperty = key => key !== "children" // func to check and exclude if its the children prop
    //
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        })

    // rescurse and for every child append 
    element.props.children.forEach(child => render(child, dom))

    container.appendChild(dom)
}


const Didact = {
    createElement,
    render
}

const element = Didact.createElement(
    "div",
    { id: "foo" },
    Didact.createElement("a", null, "bar"),
    Didact.createElement("b")
)

// /** @jsx Didact.createElement */
// const element = (
//     <div style="background: salmon">
//       <h1>Hello World</h1>
//       <h2 style="text-align:right">from Didact</h2>
//     </div>
//   );

const container = document.getElementById("root")
Didact.render(element, container)