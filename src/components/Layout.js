export function Layout(content){

    return `

<header class="topbar">

    <div>

        Luna Stock Sync

    </div>

    <div>

        Administrator

    </div>

</header>

<div class="container">

    <aside class="sidebar">

        <button data-page="dashboard">

            Dashboard

        </button>

        <button data-page="upload">

            Upload

        </button>

        <button data-page="queue">

            Queue

        </button>

        <button data-page="history">

            History

        </button>

        <button data-page="mapping">

            Mapping

        </button>

        <button data-page="settings">

            Settings

        </button>

    </aside>

    <main class="content">

        ${content}

    </main>

</div>

`;

}