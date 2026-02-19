// Not relevant to the issue
// oxlint-disable-next-line typescript/explicit-function-return-type, typescript/explicit-module-boundary-types
export function someFunction() {
  someOtherFunction();
}

// oxlint-disable-next-line typescript/explicit-function-return-type, no-empty-function
function someOtherFunction() {}
