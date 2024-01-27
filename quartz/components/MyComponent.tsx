import { QuartzComponent, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
interface Options {
  links: Record<string, string>
}

export default (opts: Options) => {
  const year = new Date().getFullYear()
  function MyComponent({ displayClass }: QuartzComponentProps) {
    return (
      <footer class={`${displayClass ?? ""}`}>
        <hr />
        <p>Copyright &copy; {year} Jeff Gonzalez</p>
        <p>
          <small>
            Created with <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a>, © {year}
          </small>
        </p>
        <p>
          <a href="https://github.com/jeffrygonzalez">My Github</a>
        </p>
        <p>
          <a href="https://github.com/jeffrygonzalez/devnotes">These DevNotes</a>
        </p>
      </footer>
    )
  }
  return MyComponent
}
