export function inserttestbuttton(textContent: string, onclick: () => void) {
    const button = document.createElement("button");
    button.textContent = textContent;
    document.body.appendChild(button);
    button.addEventListener("click", () => {
        onclick();
    });
}
