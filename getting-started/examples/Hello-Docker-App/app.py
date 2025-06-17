import os
import time

from rich.console import Console
from rich.panel   import Panel
from rich.progress import track
from pyfiglet     import Figlet


console = Console()


def docker_banner() -> None:
    """Big, clean ASCII banner generated at runtime."""
    fig = Figlet(font="slant")          # plenty of fonts: slant, big, banner3‑D, etc.
    art = fig.renderText("DOCKER")
    console.print(Panel(art, style="cyan"))


def greet_user() -> None:
    """Greets using the NAME env‑var (defaults to World)."""
    name = os.getenv("NAME", "World")
    console.print(
        f":wave:  Hello, [bold green]{name}[/]! "
        "Welcome to your first Dockerised Python app :whale2:\n"
    )


def countdown() -> None:
    """Fancy animated countdown with Rich progress tracker."""
    console.print("🚀 Starting up in…")
    for i in track(range(3, 0, -1), description="[cyan]Launching", transient=True):
        time.sleep(1)
    console.print("[bold green]✨ You’re all set![/]\n")


def main() -> None:
    docker_banner()
    greet_user()
    countdown()
    console.print(
        ":bulb: [cyan]Tip:[/] change the [bold]NAME[/] environment variable to customise "
        "this greeting!"
    )
    console.print("[bold]📦 Docker + Python = Magic! 🐳[/]\n")


if __name__ == "__main__":
    main()
