<script lang='ts'>

	// type Suit = string;
	// type Value = number

	export let suit;
	export let value: number;
	export let back = false;
	export let pipsEnabled = false;

	let displayValue: string;
	switch (value) {
		case 11:
			displayValue = 'J';
			break;
		case 12:
			displayValue = 'Q';
			break;
		case 13:
			displayValue = 'K';
			break;
		default:
			displayValue = value as string;
	}

	const getPips = (): { left: string, top: string, flip?: boolean }[] => {
		switch (value) {
			case 1:
				return [
					{ left: '50%', top: '50%' }
				];
			case 2:
				return [
					{ left: '50%', top: '20%' },
					{ left: '50%', top: '80%', flip: true }
				];
			case 3:
				return [
					{ left: '50%', top: '50%' },
					{ left: '50%', top: '20%' },
					{ left: '50%', top: '80%', flip: true }
				];
			case 4:
				return [
					{ left: '33%', top: '20%' },
					{ left: '33%', top: '80%', flip: true },
					{ left: '67%', top: '20%' },
					{ left: '67%', top: '80%', flip: true }
				];
			case 5:
				return [
					{ left: '50%', top: '50%' },
					{ left: '33%', top: '20%' },
					{ left: '33%', top: '80%', flip: true },
					{ left: '67%', top: '20%' },
					{ left: '67%', top: '80%', flip: true }
				];
			case 6:
				return [
					{ left: '33%', top: '50%' },
					{ left: '33%', top: '20%' },
					{ left: '33%', top: '80%', flip: true },
					{ left: '67%', top: '50%' },
					{ left: '67%', top: '20%' },
					{ left: '67%', top: '80%', flip: true }
				];
			case 7:
				return [
					{ left: '33%', top: '50%' },
					{ left: '33%', top: '20%' },
					{ left: '33%', top: '80%', flip: true },
					{ left: '67%', top: '50%' },
					{ left: '67%', top: '20%' },
					{ left: '67%', top: '80%', flip: true },
					{ left: '50%', top: '35%' }
				];
			case 8:
				return [
					{ left: '33%', top: '20%' },
					{ left: '33%', top: '40%' },
					{ left: '33%', top: '60%', flip: true },
					{ left: '33%', top: '80%', flip: true },
					{ left: '67%', top: '20%' },
					{ left: '67%', top: '40%' },
					{ left: '67%', top: '60%', flip: true },
					{ left: '67%', top: '80%', flip: true }
				];
			case 9:
				return [
					{ left: '50%', top: '50%' },
					{ left: '33%', top: '20%' },
					{ left: '33%', top: '40%' },
					{ left: '33%', top: '60%', flip: true },
					{ left: '33%', top: '80%', flip: true },
					{ left: '67%', top: '20%' },
					{ left: '67%', top: '40%' },
					{ left: '67%', top: '60%', flip: true },
					{ left: '67%', top: '80%', flip: true }
				];
			case 10:
				return [
					{ left: '50%', top: '35%' },
					{ left: '50%', top: '65%', flip: true },
					{ left: '33%', top: '20%' },
					{ left: '33%', top: '40%' },
					{ left: '33%', top: '60%', flip: true },
					{ left: '33%', top: '80%', flip: true },
					{ left: '67%', top: '20%' },
					{ left: '67%', top: '40%' },
					{ left: '67%', top: '60%', flip: true },
					{ left: '67%', top: '80%', flip: true }
				];
			default:
				return [];
		}
	};

	let corners = ['top left', 'bottom right'];
	let pips = pipsEnabled ? getPips() : [];
</script>

<style lang='scss'>
  @import url('https://fonts.googleapis.com/css?family=Lora:400,700');

  $base: 50px;
  body {
    padding: 10px 0 0 10px;
  }

  .card {
    font-family: Lora, serif;
    font-weight: 700;
    float: left;
    margin: 5px;
    width: $base * 3;
    height: $base * 4;
    background: linear-gradient(to left top, white, #f0f0f0);
    border-radius: $base * 0.1;
    box-shadow: 2px 2px 6px rgba(black, 0.2),
    inset 0 0 0 1px rgba(black, 0.2);
    position: relative;

    &.red {
      color: crimson;
    }

    .corner {
      position: absolute;
      text-align: center;

      &.top {
        top: 10px;
      }

      &.left {
        left: 10px;
      }

      &.bottom {
        bottom: 10px;
      }

      &.right {
        right: 10px;
      }

      h1 {
        font-size: 1.5em;
      }

      .pip {
        font-size: 1.3em;
      }

      &:last-of-type {
        transform: rotate(180deg);
      }
    }

    .pip {
      font-family: serif;

      &.club:before {
        content: '\02663';
      }

      &.heart:before {
        content: '\02665';
      }

      &.spade:before {
        content: '\02660';
      }

      &.diamond:before {
        content: '\02666';
      }
    }

    .pips {
      .pip {
        position: absolute;
        transform: translate(-50%, -50%);
        font-size: 2.3em;

        &.flip {
          transform: translate(-50%, -50%) rotate(180deg);
        }
      }

      h1 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4em;
        border-width: 1px;
        border-style: solid;
        text-align: center;
        line-height: $base * 2.5;
        width: $base * 1.5;
      }
    }
  }

  .back {
    background: linear-gradient(to top, #0f0c29, #302b63, #24243e);
  }
</style>

{#if !back}
	<div class='card {suit === "heart" || suit === "diamond" ? "red" : "black"}'>
		{#each corners as corner}
			<div class='corner {corner}'>
				<h1>{displayValue}</h1>
				<span class='pip {suit}'></span>
			</div>
		{/each}

		<div class='pips'>
			{#each pips as pip}
				<span class='pip {suit}' class:flip={pip.flip} style:left={pip.left} style:top={pip.top}></span>
			{/each}
			{#if pips.length === 0}
				<h1>{displayValue}</h1>
			{/if}
		</div>
	</div>
{:else}
	<div class='card back'></div>
{/if}