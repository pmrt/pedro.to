<script lang="ts">
  import { tick, type ComponentType } from "svelte";
  import NotFound from "./cmd/NotFound.svelte";
  import Projects from "./cmd/Projects.svelte";

  const commandToOutput: Record<string, ComponentType | undefined> = {
    "projects": Projects,
  }

  let history: string[] = [];
  let command: string;
  let commandEl: HTMLDivElement;

  function autofocus(el: HTMLDivElement) {
    el.focus();
  }

  /*
  our command input is a div with contenteditable with a pseudoelement
  'before' acting as the console prefix (visitor@pedro.to:~$). There is
  a weird bug that places the visual caret before the pseudoelement
  (position 0,0 of the div) if the div content is empty. We fix this by
  preventing it to become empty with a space and by starting the div
  content with the same space (&hairsp;)
  */
  function autospace(evt: Event) {
    const target = evt.target as HTMLDivElement;
    if (target.innerText.length == 0) {
      target.innerHTML = "&hairsp;"
    }
  }

  async function handleKeydown(evt: KeyboardEvent) {
    if (evt.key === 'Enter') {
      evt.preventDefault()
      const cmd = command.trim()
      if (cmd !== "") {
        history = [...history, cmd]
        commandEl.innerHTML = "&hairsp;"
        await tick();
        commandEl.scrollTo(0, commandEl.scrollHeight)
      }
    }
  }

  function getOutput(command: string): ComponentType {
    const comp = commandToOutput[command]
    if (!comp) {
      return NotFound
    }
    return comp
  }


</script>

<section>
  <section>
  {#each history as entry }
    <article>
      <p>visitor@pedro.to:~$ {entry}</p>
      <svelte:component this={getOutput(entry)}/>
    </article>

  {/each}
  </section>
  <section>
    <article>
      <div
        role="textbox"
        aria-autocomplete="none"
        tabindex="0"
        id="command"
        contenteditable="true"
        use:autofocus
        bind:this={commandEl}
        bind:innerText={command}
        on:input={autospace}
        on:keydown={handleKeydown}
        spellcheck="false"
        autocorrect="false"
        >
        &hairsp;
      </div>
    </article>
  </section>
</section>

<style>
  #command::before{
    content: 'visitor@pedro.to:~$ ';
  }

  #command {
    display: inline-block;
    word-break: break-all;
    outline: none;
  }
</style>