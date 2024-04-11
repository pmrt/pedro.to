<section class="info-table newline">
  <p class="newline"><i>Click on every project for more</i></p>
  <article>
    <a href="https://rcap.tv" target="_blank" rel="nofollow"><p><span>Rcap.tv</span> A twitch clip tool. Quickly find best moments of past streams. With the clip tracker and server written in Golang and the front-end in Javascript (using React), Rcap.tv collects thousands of clips with the clip collector daemon, optimized to prevent rate limiting, into a postgres database and the server exposes them to the front-end. A hybrid mode allows guest users to watch some clips and try out the webapp without logging in while encouraging login with Twitch account (via oauth2) to get more and up-to-date clips. Using oauth2 helps us preventing rate limiting. Export, download, playlists and much more are future features planned for this app. Full source-code is available on Github</p></a>
  </article>
  <article>
    <a href="https://github.com/pmrt/o7map" target="_blank" rel="nofollow"><p><span>O7map</span> A web tool for the game Eve: Echoes. It was an interactive map of the game's universe where users were able to report spotted enemies on stations, planets and other universe objects. Monetized by donations and ads, peaking at hunders of users per day. The server is written in Golang for efficient concurrency. Reports are persisted into a MySQL database and the users receive nearly real-time feedback from other users in the form of interactive reports on the map. Front-end used React for the interactive layer of the map, the settings and the rest of the UI. The map is drawn and rendered using the canvas library Fabricjs. Discord oauth is implemented as the login option, by logging in user's reports have more weight in the algorithm and other customization options. The project generated revenue by ads but when the new in-game mechanics were implemented, including features that overlapped with the app's features, o7map became less useful. Full source-code is available on Github</p></a>
  </article>
  <article>
    <p><span>Eveetools</span>A resource path simulator for the game Eve: Echoes. Eveetools was part of the collection of tools for the huge Eve: Echoes universe. It was a simulator which runs every single possible path to obtain a particular amount of materials after mining and processing ores.  When it comes to resources in Eve, there are different types of
      mineral ores you can mine and in turn they will output multiple materials when processed which then can be used to build ships.
      The tricky part is that multiple ores output multiple materials so there are from thousands to millions of possible ore paths
      depending on the needed materials, so it is hard to calculate the best ore combinations to build a ship. There was calculators at the time to help in the mid steps, but this was a full-fledged simulator which directly calculated the 100 best paths. Full source-code is on Github
      </p>
  </article>
  <article>
    <a href="https://github.com/pmrt/whatshidden" target="_blank" rel="nofollow"><p><span>Whatshidden</span>Whatshidden was an open-source tool for Whatsapp. It acts as a server and displays a QR code to be scanned by the user. Once scanned, it gets full access to the Whatsapp account to perform automated tasks such a logging every message to counter the Whatsapp 'delete for everyone' feature, sending messages, or even decrypting files and storing them without marking them as read. To accomplish this, reverse engineering of Whatsapp Web's minified code was needed beforehand. The projects is archived and full source-code is available on Github</p></a>
  </article>
</section>

<style>
  .info-table span {
    width: 112px;
  }

  .info-table article {
    cursor: pointer;
  }

  .info-table article:hover {
    text-decoration: underline;
  }
</style>