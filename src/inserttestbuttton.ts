export function inserttestbuttton(
    container: HTMLElement,
    textContent: string,
    onclick: (button: HTMLButtonElement) => void
) {
    const button = document.createElement("button");
    button.textContent = textContent;
    container.appendChild(button);
    button.addEventListener("click", () => {
        onclick(button);
    });
    return button;
}
