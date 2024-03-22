<script lang="ts">
  import Terminal from "./lib/Terminal.svelte";
  import { getAndSetLastSession } from "./lib/utils/lastSession";

  const lastSession = getAndSetLastSession()
</script>

<main>
  <header>
    <p>Ubuntu 23.0 LTS ubuntu tty1</p>
    <pre id="ascii-art" class="newline">
██████╗ ███████╗██████╗ ██████╗  ██████╗ ████████╗ ██████╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔═══██╗╚══██╔══╝██╔═══██╗
██████╔╝█████╗  ██║  ██║██████╔╝██║   ██║   ██║   ██║   ██║
██╔═══╝ ██╔══╝  ██║  ██║██╔══██╗██║   ██║   ██║   ██║   ██║
██║     ███████╗██████╔╝██║  ██║╚██████╔╝██╗██║   ╚██████╔╝
╚═╝     ╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝╚═╝    ╚═════╝
    </pre>
    <p>Welcome to Pedro's portfolio</p>
    <p>* Type 'help' to see a list of available commands</p>
    {#if lastSession != null }
      <p class="newline">Last session at {lastSession}</p>
    {/if}
  </header>
  <section class="info-table newline">
    <article>
      <p><span>About me</span>Hi, I’m Pedro! Full-Stack developer from Granada, Spain. Javascript by day, Golang by night. Designer hobbyist.</p>
    </article>
    <article>
      <p><span>Projects</span>Click here or type 'projects'</p>
    </article>
    <article>
      <p><span>Contact</span>c@pedro.to</p>
    </article>
    <article>
      <p><span>Github</span>@pmrt</p>
    </article>
  </section>
  <Terminal/>
</main>

<style>
  :global(.newline) {
    padding: calc(var(--padding)*2) 0 ;
  }

  :global(.info-table article) {
    margin-bottom: 0.5em;
  }

  :global(.info-table span) {
    display: inline-block;
    background-color: var(--color-primary);
    color: var(--color-bg);
    text-transform: uppercase;
    text-align: center;
    margin-right: 1em;
    width: 80px;
  }

  main {
    position: absolute;
    top: var(--margin);
    left: var(--margin);
    right: var(--margin);
    bottom: var(--margin);
    padding: var(--padding);
    max-width: 80vw;
  }

  header > pre {
    white-space: pre;
  }

  p + p {
    margin-top: var(--margin);
  }

  #ascii-art {
    font-size: 11px;
  }

  @media screen and (max-width: 992px) {
    main {
      max-width: 100vw;
    }
  }
</style>
