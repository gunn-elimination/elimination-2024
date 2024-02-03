<script>
	import Container from '$lib/components/Container.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import calendarImage from '$lib/assets/images/calendar.png';
</script>

<div class="flex w-full justify-center [&:has(.-about-rules:hover)]:overflow-hidden">
	<div
		class="h-full w-[80%] [&:has(.-about-rules:hover)_*:not(:has(.-about-rules))]:opacity-30 [&:has(.-about-rules:hover)_*]:transition-opacity [&:has(.-about-rules:hover)_*]:duration-300 [&:has(.-about-rules:hover)_.-about-rules]:opacity-100"
	>
		<h1 class="-z-50 mt-16 font-advent text-9xl text-zinc-700 max-md:text-7xl">about</h1>
		<div class="mb-16 mt-4 flex flex-col p-4 text-2xl text-neutral-300/80 max-md:text-lg">
			<div class="mb-10 font-dosis max-md:mb-20">
				Gunn Elimination is a school-wide, competitive game of tag where each player is assigned a
				target to find and eliminate. Each day, there are different rules players can follow to be
				safe.
			</div>
			<div class="flex flex-auto justify-between self-end">
				<div class="mr-2 font-poiret text-2xl text-gray-600/60 max-md:text-lg">see</div>
				<a
					href="https://docs.google.com/document/d/1hVzXL1SsPiucapmx3-DCVyd8zRgJaDpWrZHDbUM1K3w/edit?usp=sharing"
					target="_blank"
					class="-about-rules relative mr-8 w-min self-end px-6 py-2 font-poiret text-zinc-300 no-underline before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-[85%] before:w-8 before:border-l-[1px] before:border-t-[1px] before:border-zinc-500 before:transition-all before:duration-300 after:pointer-events-none after:absolute after:bottom-0 after:right-0 after:h-6 after:w-14 after:border-b-[1px] after:border-r-[1px] after:border-zinc-500 after:transition-all after:duration-300 hover:text-zinc-100 hover:before:h-[200dvh] hover:before:w-[200dvw] hover:before:border-zinc-100 hover:after:h-screen hover:after:w-screen hover:after:border-zinc-100 max-md:pl-3 max-md:pr-4 max-md:text-lg"
				>
					Rules&nbsp;\&nbsp;Calendar
					<div
						class="pointer-events-none absolute top-[61%] -z-50 w-[70dvw] -translate-x-2/3 border-t-[1px] border-gray-700/20 max-md:-translate-x-1/2 max-sm:-translate-x-1/4"
					/>
				</a>
			</div>
		</div>
		<div class="mb-40">
			<div class="mb-0 pl-10">
				<h2
					class="relative -z-50 mb-2 font-advent text-6xl lowercase text-zinc-700 before:absolute before:-left-10 before:bottom-0 before:h-[40%] before:w-[44rem] before:border-b-[1.5px] before:border-r-[1.5px] before:border-zinc-800 max-md:before:-left-4 max-md:before:w-[40rem]"
				>
					Calendar
				</h2>
				<div
					class="relative ml-0 w-max font-raleway text-gray-400 before:absolute before:-left-2 before:-top-24 before:h-32 before:border-l-[1px] before:border-gray-400"
				>
					<span class="uppercase">Game ends</span> @ Feb 20th, 11:59 PM. The player with the most
					eliminations and still alive <span class="uppercase">wins</span>.
				</div>
			</div>
			<table class="-calendar">
				<thead>
					<tr>
						<th>Sun</th>
						<th>Mon</th>
						<th>Tue</th>
						<th>Wed</th>
						<th>Thu</th>
						<th>Fri</th>
						<th>Sat</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="-calendar-blue">
							<span>21</span><span class="-calendar-month-marker">(jan)</span>
							<span class="font-bold">
								Rules do NOT stack between days: Players only need to follow the rules for each day.
							</span>
						</td>
						<td class="-calendar-blue">
							<span>22</span>
						</td>
						<td class="-calendar-blue">
							<span>23</span>
						</td>
						<td class="-calendar-blue">
							<span>24</span>
						</td>
						<td class="-calendar-blue">
							<span>25</span>
							<span class="">Plushie handouts @ Senior Quad, Lunch</span>
						</td>
						<td class="-calendar-blue">
							<span>26</span>
							<span class="">Plushie handouts @ Senior Quad, Lunch</span>
						</td>
						<td class="-calendar-blue">
							<span>27</span>
						</td>
					</tr>
					<tr>
						<td class="-calendar-blue">
							<span>28</span>
							<span class="font-bold">Targets assigned 10 PM (Sign ups close)</span>
						</td>
						<td class="-calendar-pink">
							<span>29</span>
							<span class="">
								<span class="font-bold uppercase">Game starts 12 AM:</span><br /><span
									class="italic"
								>
									To stay safe,
								</span> players must hold the animal with the right hand.
							</span>
						</td>
						<td class="-calendar-pink">
							<span>30</span>
							<span class="">
								<span class="italic">To stay safe, </span>
								players must be holding the animal with both hands.
							</span>
						</td>
						<td class="-calendar-pink">
							<span>31</span>
							<span class="">
								<span class="font-bold">Targets Change 10 PM:</span><br /><span class="italic">
									To stay safe,
								</span>
								players must hold the animal <span class="uppercase underline">above</span> waist.
							</span>
						</td>
						<td class="-calendar-pink">
							<span>1</span><span class="-calendar-month-marker">feb</span>
							<span class="">
								<span class="italic">To stay safe, </span>
								players must hold the animal <span class="uppercase underline">above</span> their shoulder.
							</span>
						</td>
						<td class="-calendar-pink">
							<span>2</span>
							<span class="">
								<span class="italic">To stay safe, </span>
								players must be under a roof or overhang.
							</span>
						</td>
						<td class="-calendar-red">
							<span>3</span>
							<span class="">
								<span class="font-bold">10 PM:</span> Players with less than
								<span class="font-bold">one</span> elimination are automatically eliminated.<br />
								<div class="mt-2 font-bold">Targets Change</div>
							</span>
						</td>
					</tr>
					<tr>
						<td class="-calendar-pink">
							<span>4</span>
							<span class="font-bold">
								On weekends, players must abide by all rules and must carry a plushie to be safe.
							</span>
						</td>
						<td class="-calendar-pink">
							<span>5</span>
							<span class="">
								<span class="italic">To stay safe, </span>
								players must be touching a <span class="underline">vertical wall</span> (e.g. the side
								of a building).
							</span>
						</td>
						<td class="-calendar-pink">
							<span>6</span>
							<span class="">
								<span class="italic">To stay safe, </span>
								players must be wearing a <span class="uppercase underline">hat</span>.
							</span>
						</td>
						<td class="-calendar-pink">
							<span>7</span>
							<span class="">
								<span class="font-bold">Targets Change 10 PM:</span><br /><span class="italic">
									To stay safe,
								</span>
								players must be wearing <span class="under">JORTS (jean shorts)</span>. You
								<class class="uppercase">can</class> roll up regular jeans to be shorts-length (at or
								above knee level).
							</span>
						</td>
						<td class="-calendar-pink">
							<span>8</span>
							<span class="">
								<span class="italic">To stay safe, </span>
								players must be wearing a wig.
							</span>
						</td>
						<td class="-calendar-pink">
							<span>9</span>
							<span class="">
								<span class="italic">To stay safe, </span>
								players must be
								<span class="uppercase underline">SITTING OR LAYING DOWN ON THE GROUND</span>.
							</span>
						</td>
						<td class="-calendar-red">
							<span>10</span>
							<span class="">
								<span class="font-bold">10 PM:</span> Players with less than
								<span class="font-bold">two</span> elimination are automatically eliminated<br />
								<div class="mt-2 font-bold">Targets Change</div>
							</span>
						</td>
					</tr>
					<tr>
						<td class="-calendar-pink">
							<span>11</span>
							<span class="font-bold">
								For this week, nobody is safe; there are only requirements for eliminating others.
							</span>
						</td>
						<td class="-calendar-pink">
							<span>12</span>
							<span class="">
								<span class="italic">To eliminate players, </span>
								players must have at least one shoe off.
							</span>
						</td>
						<td class="-calendar-pink">
							<span>13</span>
							<span class="">
								<span class="italic">To eliminate players, </span>
								players must be carrying a football in one hand.
							</span>
						</td>
						<td class="-calendar-pink">
							<span>14</span>
							<span class="">
								<span class="font-bold">Targets Change 10 PM:</span><br />
								<span class="">
									<span class="italic">To eliminate players</span>, players must give their target a
									flower immediately after eliminating them.
								</span>
							</span></td
						>
						<td class="-calendar-pink">
							<span>15</span>
							<span class="">
								<span class="italic">To eliminate players</span>, players must be wearing a tie
								around their neck.
							</span>
						</td>
						<td class="-calendar-pink">
							<span>16</span>
							<span class="font-bold">
								On weekends, players must abide by all rules and must carry a plushie to be safe.
								(No school 2/16)
							</span>
						</td>
						<td class="-calendar-pink">
							<span>17</span>
						</td>
					</tr>
					<tr>
						<td class="-calendar-pink">
							<span>18</span>
						</td>
						<td class="-calendar-pink">
							<span>19</span>
							<span class="font-bold"> Weekend rules still apply (No school 2/16) </span>
						</td>
						<td class="-calendar-pink">
							<span>20</span>
							<span class=""
								><span class="uppercase underline">No one is safe</span> (can be tagged anytime even
								with animal)</span
							>
						</td>
						<td class="-calendar-pink">
							<span>21</span>
						</td>
						<td class="-calendar-pink">
							<span>22</span>
						</td>
						<td class="-calendar-pink">
							<span>23</span>
						</td>
						<td class="-calendar-pink">
							<span>24</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
<Footer />
