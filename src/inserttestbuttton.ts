export function inserttestbuttton(
    textContent: string,
    onclick: (button: HTMLButtonElement) => void
) {
    const button = document.createElement("button");
    button.textContent = textContent;
    document.body.appendChild(button);
    button.addEventListener("click", () => {
        onclick(button);
    });
    return button
}
