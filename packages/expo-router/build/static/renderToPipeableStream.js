"use strict";
/**
 * Copyright © 2023 650 Industries.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderToPipeableStream = void 0;
const react_1 = __importDefault(require("react"));
const _ctx_1 = require("../../_ctx");
async function renderToPipeableStream({ $$route: route, ...props }, moduleMap) {
    const { renderToReadableStream } = require('react-server-dom-webpack/server.edge');
    if (!_ctx_1.ctx.keys().includes(route)) {
        throw new Error('Failed to find route: ' + route + '. Expected one of: ' + _ctx_1.ctx.keys().join(', '));
    }
    const { default: Component } = await (0, _ctx_1.ctx)(route);
    console.log('Initial component', Component, route);
    // const node = getNodeFinder()(route);
    // if (node?._route) {
    // const { default: Component } = node._route.loadRoute();
    // const rsc = renderToPipeableStream(
    //   // TODO: Does this support async?
    //   // <Component {...props} />,
    //   React.createElement(Component, props),
    //   moduleMap
    // );
    // return await pipeTo(rsc.pipe);
    // method === 'GET'
    // const renderContext: RenderContext = {
    //   rerender: () => {
    //     throw new Error('Cannot rerender');
    //   },
    //   context,
    // };
    const bundlerConfig = new Proxy({}, {
        get(_target, encodedId) {
            console.log('Get manifest entry:', encodedId);
            return moduleMap[encodedId];
            // const [file, name] = encodedId.split('#') as [string, string];
            // const id = resolveClientEntry(file, config, isDev);
            // moduleIdCallback?.(id);
            // return { id, chunks: [id], name, async: true };
        },
    });
    //   moduleMap
    const elements = react_1.default.createElement(Component, props);
    return renderToReadableStream(elements, bundlerConfig);
    // return rsc.pipe;
    // }
    // throw new Error('Failed to render server component at: ' + route);
}
exports.renderToPipeableStream = renderToPipeableStream;
const stream_1 = require("stream");
async function pipeTo(pipe) {
    const rscStream = new ReadableStream({
        start(controller) {
            pipe(new stream_1.Writable({
                write(chunk, encoding, callback) {
                    controller.enqueue(chunk);
                    callback();
                },
                destroy(error, callback) {
                    if (error) {
                        controller.error(error);
                    }
                    else {
                        controller.close();
                    }
                    callback(error);
                },
            }));
        },
    });
    const res = await rscStream.getReader().read();
    return res.value.toString().trim();
}
//# sourceMappingURL=renderToPipeableStream.js.map