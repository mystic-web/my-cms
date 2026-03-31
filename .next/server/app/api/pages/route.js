"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/pages/route";
exports.ids = ["app/api/pages/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fpages%2Froute&page=%2Fapi%2Fpages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpages%2Froute.ts&appDir=C%3A%5CUsers%5CAsus%5CDownloads%5Ccms-project%5Ccms-project%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAsus%5CDownloads%5Ccms-project%5Ccms-project&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fpages%2Froute&page=%2Fapi%2Fpages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpages%2Froute.ts&appDir=C%3A%5CUsers%5CAsus%5CDownloads%5Ccms-project%5Ccms-project%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAsus%5CDownloads%5Ccms-project%5Ccms-project&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Asus_Downloads_cms_project_cms_project_app_api_pages_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/pages/route.ts */ \"(rsc)/./app/api/pages/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/pages/route\",\n        pathname: \"/api/pages\",\n        filename: \"route\",\n        bundlePath: \"app/api/pages/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Asus\\\\Downloads\\\\cms-project\\\\cms-project\\\\app\\\\api\\\\pages\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Asus_Downloads_cms_project_cms_project_app_api_pages_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/pages/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZwYWdlcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcGFnZXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZwYWdlcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBc3VzJTVDRG93bmxvYWRzJTVDY21zLXByb2plY3QlNUNjbXMtcHJvamVjdCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDQXN1cyU1Q0Rvd25sb2FkcyU1Q2Ntcy1wcm9qZWN0JTVDY21zLXByb2plY3QmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQytCO0FBQzVHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktY21zLz8xZmRmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXEFzdXNcXFxcRG93bmxvYWRzXFxcXGNtcy1wcm9qZWN0XFxcXGNtcy1wcm9qZWN0XFxcXGFwcFxcXFxhcGlcXFxccGFnZXNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3BhZ2VzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcGFnZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3BhZ2VzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcQXN1c1xcXFxEb3dubG9hZHNcXFxcY21zLXByb2plY3RcXFxcY21zLXByb2plY3RcXFxcYXBwXFxcXGFwaVxcXFxwYWdlc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvcGFnZXMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fpages%2Froute&page=%2Fapi%2Fpages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpages%2Froute.ts&appDir=C%3A%5CUsers%5CAsus%5CDownloads%5Ccms-project%5Ccms-project%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAsus%5CDownloads%5Ccms-project%5Ccms-project&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/pages/route.ts":
/*!********************************!*\
  !*** ./app/api/pages/route.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/models/Page */ \"(rsc)/./models/Page.ts\");\n/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! slugify */ \"(rsc)/./node_modules/slugify/slugify.js\");\n/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(slugify__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nasync function GET(req) {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n        const { searchParams } = new URL(req.url);\n        const status = searchParams.get(\"status\");\n        const query = status ? {\n            status\n        } : {};\n        const pages = await _models_Page__WEBPACK_IMPORTED_MODULE_4__[\"default\"].find(query).sort({\n            updatedAt: -1\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(pages);\n    } catch  {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(req) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n        const data = await req.json();\n        // Generate unique slug\n        let slug = slugify__WEBPACK_IMPORTED_MODULE_5___default()(data.title, {\n            lower: true,\n            strict: true\n        });\n        const existing = await _models_Page__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findOne({\n            slug\n        });\n        if (existing) {\n            slug = `${slug}-${Date.now()}`;\n        }\n        const page = await _models_Page__WEBPACK_IMPORTED_MODULE_4__[\"default\"].create({\n            ...data,\n            slug\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(page, {\n            status: 201\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3BhZ2VzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDRTtBQUNKO0FBQ0g7QUFDTDtBQUNIO0FBRXRCLGVBQWVNLElBQUlDLEdBQVk7SUFDcEMsSUFBSTtRQUNGLE1BQU1KLHdEQUFTQTtRQUNmLE1BQU0sRUFBRUssWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSUYsSUFBSUcsR0FBRztRQUN4QyxNQUFNQyxTQUFTSCxhQUFhSSxHQUFHLENBQUM7UUFFaEMsTUFBTUMsUUFBUUYsU0FBUztZQUFFQTtRQUFPLElBQUksQ0FBQztRQUNyQyxNQUFNRyxRQUFRLE1BQU1WLG9EQUFJQSxDQUFDVyxJQUFJLENBQUNGLE9BQU9HLElBQUksQ0FBQztZQUFFQyxXQUFXLENBQUM7UUFBRTtRQUMxRCxPQUFPakIscURBQVlBLENBQUNrQixJQUFJLENBQUNKO0lBQzNCLEVBQUUsT0FBTTtRQUNOLE9BQU9kLHFEQUFZQSxDQUFDa0IsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBZSxHQUFHO1lBQUVSLFFBQVE7UUFBSTtJQUNwRTtBQUNGO0FBRU8sZUFBZVMsS0FBS2IsR0FBWTtJQUNyQyxJQUFJO1FBQ0YsTUFBTWMsVUFBVSxNQUFNcEIsMkRBQWdCQSxDQUFDQyxrREFBV0E7UUFDbEQsSUFBSSxDQUFDbUIsU0FBUyxPQUFPckIscURBQVlBLENBQUNrQixJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFlLEdBQUc7WUFBRVIsUUFBUTtRQUFJO1FBRWhGLE1BQU1SLHdEQUFTQTtRQUNmLE1BQU1tQixPQUFPLE1BQU1mLElBQUlXLElBQUk7UUFFM0IsdUJBQXVCO1FBQ3ZCLElBQUlLLE9BQU9sQiw4Q0FBT0EsQ0FBQ2lCLEtBQUtFLEtBQUssRUFBRTtZQUFFQyxPQUFPO1lBQU1DLFFBQVE7UUFBSztRQUMzRCxNQUFNQyxXQUFXLE1BQU12QixvREFBSUEsQ0FBQ3dCLE9BQU8sQ0FBQztZQUFFTDtRQUFLO1FBQzNDLElBQUlJLFVBQVU7WUFDWkosT0FBTyxDQUFDLEVBQUVBLEtBQUssQ0FBQyxFQUFFTSxLQUFLQyxHQUFHLEdBQUcsQ0FBQztRQUNoQztRQUVBLE1BQU1DLE9BQU8sTUFBTTNCLG9EQUFJQSxDQUFDNEIsTUFBTSxDQUFDO1lBQUUsR0FBR1YsSUFBSTtZQUFFQztRQUFLO1FBQy9DLE9BQU92QixxREFBWUEsQ0FBQ2tCLElBQUksQ0FBQ2EsTUFBTTtZQUFFcEIsUUFBUTtRQUFJO0lBQy9DLEVBQUUsT0FBT1EsT0FBWTtRQUNuQixPQUFPbkIscURBQVlBLENBQUNrQixJQUFJLENBQUM7WUFBRUMsT0FBT0EsTUFBTWMsT0FBTztRQUFDLEdBQUc7WUFBRXRCLFFBQVE7UUFBSTtJQUNuRTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktY21zLy4vYXBwL2FwaS9wYWdlcy9yb3V0ZS50cz9mYjE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCdcbmltcG9ydCBjb25uZWN0REIgZnJvbSAnQC9saWIvbW9uZ29kYidcbmltcG9ydCBQYWdlIGZyb20gJ0AvbW9kZWxzL1BhZ2UnXG5pbXBvcnQgc2x1Z2lmeSBmcm9tICdzbHVnaWZ5J1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcTogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGF3YWl0IGNvbm5lY3REQigpXG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxLnVybClcbiAgICBjb25zdCBzdGF0dXMgPSBzZWFyY2hQYXJhbXMuZ2V0KCdzdGF0dXMnKVxuICAgIFxuICAgIGNvbnN0IHF1ZXJ5ID0gc3RhdHVzID8geyBzdGF0dXMgfSA6IHt9XG4gICAgY29uc3QgcGFnZXMgPSBhd2FpdCBQYWdlLmZpbmQocXVlcnkpLnNvcnQoeyB1cGRhdGVkQXQ6IC0xIH0pXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHBhZ2VzKVxuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1NlcnZlciBlcnJvcicgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuICAgIGlmICghc2Vzc2lvbikgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSlcblxuICAgIGF3YWl0IGNvbm5lY3REQigpXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcS5qc29uKClcblxuICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSBzbHVnXG4gICAgbGV0IHNsdWcgPSBzbHVnaWZ5KGRhdGEudGl0bGUsIHsgbG93ZXI6IHRydWUsIHN0cmljdDogdHJ1ZSB9KVxuICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgUGFnZS5maW5kT25lKHsgc2x1ZyB9KVxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgc2x1ZyA9IGAke3NsdWd9LSR7RGF0ZS5ub3coKX1gXG4gICAgfVxuXG4gICAgY29uc3QgcGFnZSA9IGF3YWl0IFBhZ2UuY3JlYXRlKHsgLi4uZGF0YSwgc2x1ZyB9KVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihwYWdlLCB7IHN0YXR1czogMjAxIH0pXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJjb25uZWN0REIiLCJQYWdlIiwic2x1Z2lmeSIsIkdFVCIsInJlcSIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInN0YXR1cyIsImdldCIsInF1ZXJ5IiwicGFnZXMiLCJmaW5kIiwic29ydCIsInVwZGF0ZWRBdCIsImpzb24iLCJlcnJvciIsIlBPU1QiLCJzZXNzaW9uIiwiZGF0YSIsInNsdWciLCJ0aXRsZSIsImxvd2VyIiwic3RyaWN0IiwiZXhpc3RpbmciLCJmaW5kT25lIiwiRGF0ZSIsIm5vdyIsInBhZ2UiLCJjcmVhdGUiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/pages/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.ts\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                await (0,_mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n                const user = await _models_User__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n                    email: credentials.email\n                });\n                if (!user) return null;\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(credentials.password, user.password);\n                if (!isValid) return null;\n                return {\n                    id: user._id.toString(),\n                    email: user.email,\n                    name: user.name,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.role = token.role;\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDaUU7QUFDcEM7QUFDSTtBQUNEO0FBRXpCLE1BQU1JLGNBQStCO0lBQzFDQyxXQUFXO1FBQ1RMLDJFQUFtQkEsQ0FBQztZQUNsQk0sTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVLE9BQU87Z0JBRTFELE1BQU1ULG9EQUFTQTtnQkFDZixNQUFNVyxPQUFPLE1BQU1WLG9EQUFJQSxDQUFDVyxPQUFPLENBQUM7b0JBQUVOLE9BQU9ELFlBQVlDLEtBQUs7Z0JBQUM7Z0JBQzNELElBQUksQ0FBQ0ssTUFBTSxPQUFPO2dCQUVsQixNQUFNRSxVQUFVLE1BQU1kLHVEQUFjLENBQUNNLFlBQVlJLFFBQVEsRUFBRUUsS0FBS0YsUUFBUTtnQkFDeEUsSUFBSSxDQUFDSSxTQUFTLE9BQU87Z0JBRXJCLE9BQU87b0JBQ0xFLElBQUlKLEtBQUtLLEdBQUcsQ0FBQ0MsUUFBUTtvQkFDckJYLE9BQU9LLEtBQUtMLEtBQUs7b0JBQ2pCRixNQUFNTyxLQUFLUCxJQUFJO29CQUNmYyxNQUFNUCxLQUFLTyxJQUFJO2dCQUNqQjtZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVWLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSVSxNQUFNSCxJQUFJLEdBQUcsS0FBY0EsSUFBSTtnQkFDL0JHLE1BQU1OLEVBQUUsR0FBRyxLQUFjQSxFQUFFO1lBQzdCO1lBQ0EsT0FBT007UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUMsUUFBUVgsSUFBSSxFQUFFO2dCQUNmVyxRQUFRWCxJQUFJLENBQVNPLElBQUksR0FBR0csTUFBTUgsSUFBSTtnQkFDckNJLFFBQVFYLElBQUksQ0FBU0ksRUFBRSxHQUFHTSxNQUFNTixFQUFFO1lBQ3RDO1lBQ0EsT0FBT087UUFDVDtJQUNGO0lBQ0FDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FGLFNBQVM7UUFDUEcsVUFBVTtJQUNaO0lBQ0FDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtBQUNyQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktY21zLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJ1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcydcbmltcG9ydCBjb25uZWN0REIgZnJvbSAnLi9tb25nb2RiJ1xuaW1wb3J0IFVzZXIgZnJvbSAnQC9tb2RlbHMvVXNlcidcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogJ0NyZWRlbnRpYWxzJyxcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiAnRW1haWwnLCB0eXBlOiAnZW1haWwnIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnUGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHJldHVybiBudWxsXG5cbiAgICAgICAgYXdhaXQgY29ubmVjdERCKClcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9KVxuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiBudWxsXG5cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKVxuICAgICAgICBpZiAoIWlzVmFsaWQpIHJldHVybiBudWxsXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogdXNlci5faWQudG9TdHJpbmcoKSxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlXG4gICAgICAgIHRva2VuLmlkID0gKHVzZXIgYXMgYW55KS5pZFxuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuXG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkucm9sZSA9IHRva2VuLnJvbGVcbiAgICAgICAgOyhzZXNzaW9uLnVzZXIgYXMgYW55KS5pZCA9IHRva2VuLmlkXG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvblxuICAgIH0sXG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2xvZ2luJyxcbiAgfSxcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiAnand0JyxcbiAgfSxcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXG59XG4iXSwibmFtZXMiOlsiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsImNvbm5lY3REQiIsIlVzZXIiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZE9uZSIsImlzVmFsaWQiLCJjb21wYXJlIiwiaWQiLCJfaWQiLCJ0b1N0cmluZyIsInJvbGUiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlc3Npb24iLCJwYWdlcyIsInNpZ25JbiIsInN0cmF0ZWd5Iiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable\");\n}\nlet cached = global.mongoose || {\n    conn: null,\n    promise: null\n};\nif (!global.mongoose) {\n    global.mongoose = cached;\n}\nasync function connectDB() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, {\n            bufferCommands: false\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0I7QUFFL0IsTUFBTUMsY0FBY0MsUUFBUUMsR0FBRyxDQUFDRixXQUFXO0FBRTNDLElBQUksQ0FBQ0EsYUFBYTtJQUNoQixNQUFNLElBQUlHLE1BQU07QUFDbEI7QUFXQSxJQUFJQyxTQUF3QkMsT0FBT04sUUFBUSxJQUFJO0lBQUVPLE1BQU07SUFBTUMsU0FBUztBQUFLO0FBRTNFLElBQUksQ0FBQ0YsT0FBT04sUUFBUSxFQUFFO0lBQ3BCTSxPQUFPTixRQUFRLEdBQUdLO0FBQ3BCO0FBRUEsZUFBZUk7SUFDYixJQUFJSixPQUFPRSxJQUFJLEVBQUU7UUFDZixPQUFPRixPQUFPRSxJQUFJO0lBQ3BCO0lBRUEsSUFBSSxDQUFDRixPQUFPRyxPQUFPLEVBQUU7UUFDbkJILE9BQU9HLE9BQU8sR0FBR1IsdURBQWdCLENBQUNDLGFBQWE7WUFDN0NVLGdCQUFnQjtRQUNsQjtJQUNGO0lBRUEsSUFBSTtRQUNGTixPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztJQUNwQyxFQUFFLE9BQU9JLEdBQUc7UUFDVlAsT0FBT0csT0FBTyxHQUFHO1FBQ2pCLE1BQU1JO0lBQ1I7SUFFQSxPQUFPUCxPQUFPRSxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1jbXMvLi9saWIvbW9uZ29kYi50cz8wNWJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSdcblxuY29uc3QgTU9OR09EQl9VUkkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSSFcblxuaWYgKCFNT05HT0RCX1VSSSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBkZWZpbmUgdGhlIE1PTkdPREJfVVJJIGVudmlyb25tZW50IHZhcmlhYmxlJylcbn1cblxuaW50ZXJmYWNlIE1vbmdvb3NlQ2FjaGUge1xuICBjb25uOiB0eXBlb2YgbW9uZ29vc2UgfCBudWxsXG4gIHByb21pc2U6IFByb21pc2U8dHlwZW9mIG1vbmdvb3NlPiB8IG51bGxcbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICB2YXIgbW9uZ29vc2U6IE1vbmdvb3NlQ2FjaGUgfCB1bmRlZmluZWRcbn1cblxubGV0IGNhY2hlZDogTW9uZ29vc2VDYWNoZSA9IGdsb2JhbC5tb25nb29zZSB8fCB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfVxuXG5pZiAoIWdsb2JhbC5tb25nb29zZSkge1xuICBnbG9iYWwubW9uZ29vc2UgPSBjYWNoZWRcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29ubmVjdERCKCkge1xuICBpZiAoY2FjaGVkLmNvbm4pIHtcbiAgICByZXR1cm4gY2FjaGVkLmNvbm5cbiAgfVxuXG4gIGlmICghY2FjaGVkLnByb21pc2UpIHtcbiAgICBjYWNoZWQucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3QoTU9OR09EQl9VUkksIHtcbiAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcbiAgICB9KVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjYWNoZWQuY29ubiA9IGF3YWl0IGNhY2hlZC5wcm9taXNlXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWQucHJvbWlzZSA9IG51bGxcbiAgICB0aHJvdyBlXG4gIH1cblxuICByZXR1cm4gY2FjaGVkLmNvbm5cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdERCXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsImNvbm4iLCJwcm9taXNlIiwiY29ubmVjdERCIiwiY29ubmVjdCIsImJ1ZmZlckNvbW1hbmRzIiwiZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./models/Page.ts":
/*!************************!*\
  !*** ./models/Page.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst PageSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    title: {\n        type: String,\n        required: true\n    },\n    slug: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    content: {\n        type: String,\n        default: \"\"\n    },\n    htmlCode: {\n        type: String,\n        default: \"\"\n    },\n    cssCode: {\n        type: String,\n        default: \"\"\n    },\n    jsCode: {\n        type: String,\n        default: \"\"\n    },\n    metaTitle: {\n        type: String,\n        default: \"\"\n    },\n    metaDescription: {\n        type: String,\n        default: \"\"\n    },\n    featuredImage: {\n        type: String,\n        default: \"\"\n    },\n    status: {\n        type: String,\n        enum: [\n            \"draft\",\n            \"published\"\n        ],\n        default: \"draft\"\n    }\n}, {\n    timestamps: true\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Page || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Page\", PageSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvUGFnZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUQ7QUFpQnJELE1BQU1FLGFBQWEsSUFBSUQsNENBQU1BLENBQzNCO0lBQ0VFLE9BQU87UUFBRUMsTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQ3RDQyxNQUFNO1FBQUVILE1BQU1DO1FBQVFDLFVBQVU7UUFBTUUsUUFBUTtJQUFLO0lBQ25EQyxTQUFTO1FBQUVMLE1BQU1DO1FBQVFLLFNBQVM7SUFBRztJQUNyQ0MsVUFBVTtRQUFFUCxNQUFNQztRQUFRSyxTQUFTO0lBQUc7SUFDdENFLFNBQVM7UUFBRVIsTUFBTUM7UUFBUUssU0FBUztJQUFHO0lBQ3JDRyxRQUFRO1FBQUVULE1BQU1DO1FBQVFLLFNBQVM7SUFBRztJQUNwQ0ksV0FBVztRQUFFVixNQUFNQztRQUFRSyxTQUFTO0lBQUc7SUFDdkNLLGlCQUFpQjtRQUFFWCxNQUFNQztRQUFRSyxTQUFTO0lBQUc7SUFDN0NNLGVBQWU7UUFBRVosTUFBTUM7UUFBUUssU0FBUztJQUFHO0lBQzNDTyxRQUFRO1FBQUViLE1BQU1DO1FBQVFhLE1BQU07WUFBQztZQUFTO1NBQVk7UUFBRVIsU0FBUztJQUFRO0FBQ3pFLEdBQ0E7SUFBRVMsWUFBWTtBQUFLO0FBR3JCLGlFQUFlbkIsd0RBQWUsQ0FBQ3FCLElBQUksSUFBSXJCLHFEQUFjLENBQVEsUUFBUUUsV0FBV0EsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL215LWNtcy8uL21vZGVscy9QYWdlLnRzPzJiNjciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgRG9jdW1lbnQgfSBmcm9tICdtb25nb29zZSdcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2UgZXh0ZW5kcyBEb2N1bWVudCB7XHJcbiAgdGl0bGU6IHN0cmluZ1xyXG4gIHNsdWc6IHN0cmluZ1xyXG4gIGNvbnRlbnQ6IHN0cmluZ1xyXG4gIGh0bWxDb2RlOiBzdHJpbmdcclxuICBjc3NDb2RlOiBzdHJpbmdcclxuICBqc0NvZGU6IHN0cmluZ1xyXG4gIG1ldGFUaXRsZTogc3RyaW5nXHJcbiAgbWV0YURlc2NyaXB0aW9uOiBzdHJpbmdcclxuICBmZWF0dXJlZEltYWdlOiBzdHJpbmdcclxuICBzdGF0dXM6ICdkcmFmdCcgfCAncHVibGlzaGVkJ1xyXG4gIGNyZWF0ZWRBdDogRGF0ZVxyXG4gIHVwZGF0ZWRBdDogRGF0ZVxyXG59XHJcblxyXG5jb25zdCBQYWdlU2NoZW1hID0gbmV3IFNjaGVtYTxJUGFnZT4oXHJcbiAge1xyXG4gICAgdGl0bGU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgc2x1ZzogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCB1bmlxdWU6IHRydWUgfSxcclxuICAgIGNvbnRlbnQ6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnJyB9LFxyXG4gICAgaHRtbENvZGU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnJyB9LFxyXG4gICAgY3NzQ29kZTogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICcnIH0sXHJcbiAgICBqc0NvZGU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnJyB9LFxyXG4gICAgbWV0YVRpdGxlOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJycgfSxcclxuICAgIG1ldGFEZXNjcmlwdGlvbjogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICcnIH0sXHJcbiAgICBmZWF0dXJlZEltYWdlOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJycgfSxcclxuICAgIHN0YXR1czogeyB0eXBlOiBTdHJpbmcsIGVudW06IFsnZHJhZnQnLCAncHVibGlzaGVkJ10sIGRlZmF1bHQ6ICdkcmFmdCcgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVscy5QYWdlIHx8IG1vbmdvb3NlLm1vZGVsPElQYWdlPignUGFnZScsIFBhZ2VTY2hlbWEpIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU2NoZW1hIiwiUGFnZVNjaGVtYSIsInRpdGxlIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwic2x1ZyIsInVuaXF1ZSIsImNvbnRlbnQiLCJkZWZhdWx0IiwiaHRtbENvZGUiLCJjc3NDb2RlIiwianNDb2RlIiwibWV0YVRpdGxlIiwibWV0YURlc2NyaXB0aW9uIiwiZmVhdHVyZWRJbWFnZSIsInN0YXR1cyIsImVudW0iLCJ0aW1lc3RhbXBzIiwibW9kZWxzIiwiUGFnZSIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/Page.ts\n");

/***/ }),

/***/ "(rsc)/./models/User.ts":
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    password: {\n        type: String,\n        required: true\n    },\n    role: {\n        type: String,\n        enum: [\n            \"admin\",\n            \"editor\"\n        ],\n        default: \"editor\"\n    },\n    createdAt: {\n        type: Date,\n        default: Date.now\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvVXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUQ7QUFVckQsTUFBTUUsYUFBYSxJQUFJRCw0Q0FBTUEsQ0FBUTtJQUNuQ0UsTUFBTTtRQUFFQyxNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDckNDLE9BQU87UUFBRUgsTUFBTUM7UUFBUUMsVUFBVTtRQUFNRSxRQUFRO0lBQUs7SUFDcERDLFVBQVU7UUFBRUwsTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQ3pDSSxNQUFNO1FBQUVOLE1BQU1DO1FBQVFNLE1BQU07WUFBQztZQUFTO1NBQVM7UUFBRUMsU0FBUztJQUFTO0lBQ25FQyxXQUFXO1FBQUVULE1BQU1VO1FBQU1GLFNBQVNFLEtBQUtDLEdBQUc7SUFBQztBQUM3QztBQUVBLGlFQUFlZix3REFBZSxDQUFDaUIsSUFBSSxJQUFJakIscURBQWMsQ0FBUSxRQUFRRSxXQUFXQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktY21zLy4vbW9kZWxzL1VzZXIudHM/NmRjNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBEb2N1bWVudCB9IGZyb20gJ21vbmdvb3NlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyIGV4dGVuZHMgRG9jdW1lbnQge1xuICBuYW1lOiBzdHJpbmdcbiAgZW1haWw6IHN0cmluZ1xuICBwYXNzd29yZDogc3RyaW5nXG4gIHJvbGU6ICdhZG1pbicgfCAnZWRpdG9yJ1xuICBjcmVhdGVkQXQ6IERhdGVcbn1cblxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8SVVzZXI+KHtcbiAgbmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIGVtYWlsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9LFxuICBwYXNzd29yZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIHJvbGU6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbJ2FkbWluJywgJ2VkaXRvciddLCBkZWZhdWx0OiAnZWRpdG9yJyB9LFxuICBjcmVhdGVkQXQ6IHsgdHlwZTogRGF0ZSwgZGVmYXVsdDogRGF0ZS5ub3cgfSxcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVscy5Vc2VyIHx8IG1vbmdvb3NlLm1vZGVsPElVc2VyPignVXNlcicsIFVzZXJTY2hlbWEpXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJTY2hlbWEiLCJVc2VyU2NoZW1hIiwibmFtZSIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsImVtYWlsIiwidW5pcXVlIiwicGFzc3dvcmQiLCJyb2xlIiwiZW51bSIsImRlZmF1bHQiLCJjcmVhdGVkQXQiLCJEYXRlIiwibm93IiwibW9kZWxzIiwiVXNlciIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/User.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/slugify"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fpages%2Froute&page=%2Fapi%2Fpages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpages%2Froute.ts&appDir=C%3A%5CUsers%5CAsus%5CDownloads%5Ccms-project%5Ccms-project%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAsus%5CDownloads%5Ccms-project%5Ccms-project&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();