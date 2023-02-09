import { useState } from "react";
import useTitle from "../../hooks/useTitle";

const Item = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border rounded shadow-sm">
            <button
                type="button"
                aria-label="Open item"
                title="Open item"
                className="flex items-center justify-between w-full p-4 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className="text-lg font-medium">{title}</p>
                <div className="flex items-center justify-center w-8 h-8 border rounded-full">
                    <svg
                        viewBox="0 0 24 24"
                        className={`w-3 text-gray-600 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                            }`}
                    >
                        <polyline
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            points="2,7 12,17 22,7"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </button>
            {isOpen && (
                <div className="p-4 pt-0">
                    <p className="text-gray-700">{children}</p>
                </div>
            )}
        </div>
    );
};

const Blog = () => {
    useTitle("Blog");
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
                <div className="flex flex-col mb-16 sm:text-center">
                    <a href="/" className="mb-6 sm:mx-auto">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                            <svg
                                className="w-10 h-10 text-deep-purple-accent-400"
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                />
                            </svg>
                        </div>
                    </a>

                </div>
                <div className="space-y-4 text-black">
                    <Item title="What are the different ways to manage a state in a React application?">
                        React's useState is the best option for local state management. If you need a global state solution, the most popular ones are Redux, useReducerHook, MobX, and the built-in Context API. Your choice will depend on the size of your project, your needs, and your engineers' expertise.
                    </Item>
                    <Item title="How does prototypical inheritance work?">
                        The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object.
                    </Item>
                    <Item title="What is a unit test? Why should we write unit tests?">
                        Unit test: Unit Testing is a type of software testing where individual units or components of a software are tested.
                        Unit testing ensures that all code meets quality standards before its deployed. This ensures a reliable engineering environment where quality
                    </Item>
                    <Item title="React vs. Angular vs. Vue?">
                        Angular js has two way data binding where react has one way and vue has two way.Angular is written in TypeScript, which means you need some time to learn it to work with this framework. React uses JSX and native Javascript developers are familiar with it. The training period is easier and does not require that much preparation. Vue.js makes use of an HTML-based template syntax that allows you to link the displayed DOM to the data of the base element instance declaratively
                    </Item>
                </div>
            </div>
        </div>
    );
};


export default Blog;