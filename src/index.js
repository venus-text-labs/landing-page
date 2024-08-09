import "./styles.css";
import "./animate.js"
require.context("./assets", true, /^\.\/.*\.png/);
require.context("./assets", true, /^\.\/.*\.svg/);
require.context("./", true, /^\.\/.*\.xml/);