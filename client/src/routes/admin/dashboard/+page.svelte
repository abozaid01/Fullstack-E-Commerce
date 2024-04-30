<script lang="ts">
	import AdminInfoCard from '$lib/components/AdminInfoCard.svelte';
	import BiSolidGroup from 'svelte-icons-pack/bi/BiSolidGroup';
	import BiMoney from 'svelte-icons-pack/bi/BiMoney';
	import BiSolidMessage from 'svelte-icons-pack/bi/BiSolidMessage';
	import AiOutlineShoppingCart from 'svelte-icons-pack/ai/AiOutlineShoppingCart';
	import type { ApexOptions } from 'apexcharts';
	import { page } from '$app/stores';
	import {
		Chart,
		Card,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Badge,
		Pagination,
		type LinkType,
		Breadcrumb,
		BreadcrumbItem
	} from 'flowbite-svelte';
	import {
		ChevronLeftOutline,
		ChevronRightOutline
	} from 'flowbite-svelte-icons';

	const lineChartOptions: ApexOptions = {
		chart: {
			height: 350,
			width: '100%',
			type: 'line',
			fontFamily: 'Inter, sans-serif',
			toolbar: {
				show: false
			}
		},
		tooltip: {
			enabled: true,
			x: {
				show: false
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 6,
			curve: 'smooth'
		},
		grid: {
			show: true,
			strokeDashArray: 0,
			position: 'back',
			xaxis: {
				lines: {
					show: true
					// offsetX: 50,
					// offsetY: 30
				}
			},
			yaxis: {
				lines: {
					show: true
					// offsetX: 100,
					// offsetY: 100
				}
			},
			padding: {
				left: 2,
				right: 2,
				top: -30
			}
		},
		series: [
			{
				name: 'line1',
				data: [43, 48, 40, 54, 67, 73, 70],
				color: '#1A56DB'
			},
			{
				name: 'line2',
				data: [24, 50, 64, 70, 52, 51, 65],
				color: '#7E3AF2'
			}
		],
		legend: {
			show: true,
			labels: {
				colors: '#6B7280'
			}
		},
		// =================== X-Axis ===================== //
		// =================== X-Axis ===================== //
		// =================== X-Axis ===================== //
		xaxis: {
			categories: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July'
			],
			labels: {
				show: true,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				}
			},
			axisBorder: {
				show: true
			},
			axisTicks: {
				show: false
			}
		},
		// =================== Y-Axis ===================== //
		// =================== Y-Axis ===================== //
		// =================== Y-Axis ===================== //
		yaxis: {
			show: true,
			labels: {
				show: false,
				style: {
					colors: 'red'
				}
			}
		}
	};

	const pieChartOptions: ApexOptions = {
		series: [52.8, 26.8, 20.4],
		colors: ['#1C64F2', '#16BDCA', '#9061F9'],
		chart: {
			height: 420,
			width: '100%',
			type: 'pie'
		},
		stroke: {
			colors: ['white']
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: -25
				}
			}
		},
		labels: ['Direct', 'Organic search', 'Referrals'],
		dataLabels: {
			enabled: true,
			style: {
				fontFamily: 'Inter, sans-serif'
			}
		},
		legend: {
			position: 'bottom',
			fontFamily: 'Inter, sans-serif',
			labels: {
				colors: '#6B7280'
			}
		},
		yaxis: {
			labels: {
				formatter: function (value) {
					return value + '%';
				}
			}
		},
		xaxis: {
			labels: {
				formatter: function (value) {
					return value + '%';
				}
			},
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false
			}
		}
	};

	const cardsData = [
		{
			title: 'Total customers',
			value: '765',
			icon: BiSolidGroup,
			color:
				'text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500'
		},
		{
			title: 'Total income',
			value: '$ 6,760.89',
			icon: BiMoney,
			color: 'text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500'
		},
		{
			title: 'New Orders',
			value: '150',
			icon: AiOutlineShoppingCart,
			color: 'text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500'
		},
		{
			title: 'Unread Chats',
			value: '15',
			icon: BiSolidMessage,
			color: 'text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500'
		}
	];

	const orderData = [
		{
			avatar: 'https://i.pravatar.cc/300',
			name: 'Chandler Jacobi',
			amount: 989.4,
			status: 'Completed',
			date: 'Mon Feb 03 2020 04:13:15 GMT-0300 (Brasilia Standard Time)'
		},
		{
			avatar: 'https://i.pravatar.cc/300',
			name: 'Monserrat Marquardt',
			amount: 471.44,
			status: 'Un-paid',
			date: 'Fri Nov 29 2019 10:43:17 GMT-0300 (Brasilia Standard Time)'
		},
		{
			avatar: 'https://i.pravatar.cc/300',
			name: 'Lonie Wyman',
			amount: 934.24,
			status: 'Paid',
			date: 'Fri Apr 03 2020 03:07:53 GMT-0300 (Brasilia Standard Time)'
		},
		{
			avatar: 'https://i.pravatar.cc/300',
			name: 'Corine Abernathy',
			amount: 351.28,
			status: 'Paid',
			date: 'Fri Jun 21 2019 20:21:55 GMT-0300 (Brasilia Standard Time)'
		},
		{
			avatar: 'https://i.pravatar.cc/300',
			name: 'Lorenz Botsford',
			amount: 355.3,
			status: 'Completed',
			date: 'Wed Aug 28 2019 15:31:43 GMT-0300 (Brasilia Standard Time)'
		},
		{
			avatar: 'https://i.pravatar.cc/300',
			name: 'Everette Botsford',
			amount: 525.42,
			status: 'Paid',
			date: 'Thu Jan 16 2020 09:53:33 GMT-0300 (Brasilia Standard Time)'
		},
		{
			avatar: 'https://i.pravatar.cc/300',
			name: 'Marilou Beahan',
			amount: 414.99,
			status: 'Paid',
			date: 'Mon Oct 28 2019 14:44:31 GMT-0300 (Brasilia Standard Time)'
		},
		{
			avatar: 'https://i.pravatar.cc/300',
			name: 'Ceasar Sauer',
			amount: 488.0,
			status: 'Completed',
			date: 'Tue Jul 23 2019 00:24:44 GMT-0300 (Brasilia Standard Time)'
		},
		{
			avatar: 'https://i.pravatar.cc/300',
			name: 'Rae McDermott',
			amount: 502.69,
			status: 'Un-paid',
			date: 'Sat Feb 01 2020 12:57:03 GMT-0300 (Brasilia Standard Time)'
		}
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Mable Steuber',
		// 	amount: 911.09,
		// 	status: 'Un-paid',
		// 	date: 'Mon Sep 09 2019 12:03:25 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Julian Glover',
		// 	amount: 656.94,
		// 	status: 'Un-paid',
		// 	date: 'Fri May 22 2020 17:46:12 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Duncan Toy',
		// 	amount: 120.78,
		// 	status: 'Un-paid',
		// 	date: 'Sun Nov 17 2019 11:59:50 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Blanche Friesen',
		// 	amount: 676.95,
		// 	status: 'Un-paid',
		// 	date: 'Sun Jun 21 2020 16:46:39 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Orion Koepp',
		// 	amount: 447.56,
		// 	status: 'Un-paid',
		// 	date: 'Thu Jun 04 2020 18:29:41 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Dakota Vandervort',
		// 	amount: 765.22,
		// 	status: 'Un-paid',
		// 	date: 'Fri Jan 31 2020 13:02:55 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Lily Collier',
		// 	amount: 449.11,
		// 	status: 'Un-paid',
		// 	date: 'Sun Aug 18 2019 14:52:01 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Kayleigh Schumm',
		// 	amount: 65.54,
		// 	status: 'Un-paid',
		// 	date: 'Wed May 06 2020 17:49:09 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'General McGlynn',
		// 	amount: 30.51,
		// 	status: 'Un-paid',
		// 	date: 'Mon Mar 30 2020 01:24:54 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Shayna Schumm',
		// 	amount: 313.73,
		// 	status: 'Un-paid',
		// 	date: 'Wed Jul 03 2019 10:01:06 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Giovanna Sanford',
		// 	amount: 398.3,
		// 	status: 'Un-paid',
		// 	date: 'Tue Oct 08 2019 17:08:43 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Emie Mante',
		// 	amount: 142.51,
		// 	status: 'Un-paid',
		// 	date: 'Wed Jul 24 2019 19:17:16 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Chance Muller',
		// 	amount: 963.26,
		// 	status: 'Un-paid',
		// 	date: 'Sun Dec 01 2019 14:04:10 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Armani Torphy',
		// 	amount: 445.23,
		// 	status: 'Un-paid',
		// 	date: 'Tue Dec 24 2019 13:28:36 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Braeden Ward',
		// 	amount: 588.53,
		// 	status: 'Un-paid',
		// 	date: 'Wed Apr 15 2020 21:40:11 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Malcolm Price',
		// 	amount: 181.93,
		// 	status: 'Un-paid',
		// 	date: 'Thu Oct 24 2019 07:09:03 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Susan Jast',
		// 	amount: 928.41,
		// 	status: 'Un-paid',
		// 	date: 'Sun Feb 09 2020 23:22:23 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Torrey Reynolds',
		// 	amount: 447.37,
		// 	status: 'Un-paid',
		// 	date: 'Mon Oct 28 2019 04:10:39 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Travon Harber',
		// 	amount: 422.48,
		// 	status: 'Un-paid',
		// 	date: 'Sat Nov 09 2019 05:04:09 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Hattie Gutkowski',
		// 	amount: 714.34,
		// 	status: 'Un-paid',
		// 	date: 'Tue Oct 22 2019 22:36:23 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Demarco Lang',
		// 	amount: 536.92,
		// 	status: 'Un-paid',
		// 	date: 'Wed Apr 08 2020 03:05:59 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Glennie Ziemann',
		// 	amount: 597.25,
		// 	status: 'Un-paid',
		// 	date: 'Mon Jun 22 2020 21:27:06 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Alta Howe',
		// 	amount: 42.28,
		// 	status: 'Un-paid',
		// 	date: 'Sat Oct 12 2019 22:57:22 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Sydnee Gottlieb',
		// 	amount: 868.92,
		// 	status: 'Un-paid',
		// 	date: 'Wed Feb 05 2020 05:17:34 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Arlene Schmitt',
		// 	amount: 364.68,
		// 	status: 'Un-paid',
		// 	date: 'Thu Oct 03 2019 08:47:32 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Hilda Schoen',
		// 	amount: 260.91,
		// 	status: 'Un-paid',
		// 	date: 'Wed Dec 04 2019 06:28:30 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Chase Bahringer',
		// 	amount: 454.61,
		// 	status: 'Un-paid',
		// 	date: 'Mon Nov 25 2019 16:59:38 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Lucile Hansen',
		// 	amount: 982.22,
		// 	status: 'Un-paid',
		// 	date: 'Sun Aug 25 2019 17:15:59 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Mollie Heaney',
		// 	amount: 390.33,
		// 	status: 'Un-paid',
		// 	date: 'Mon Jul 22 2019 01:45:19 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Bennie Kuvalis',
		// 	amount: 456.64,
		// 	status: 'Un-paid',
		// 	date: 'Sat Feb 08 2020 07:55:08 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Jodie Luettgen',
		// 	amount: 398.37,
		// 	status: 'Un-paid',
		// 	date: 'Tue Jun 09 2020 11:19:53 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Bethel Quitzon',
		// 	amount: 183.58,
		// 	status: 'Un-paid',
		// 	date: 'Sun Dec 29 2019 18:56:54 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Jon Dietrich',
		// 	amount: 439.01,
		// 	status: 'Un-paid',
		// 	date: 'Sun Dec 29 2019 11:11:34 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Nakia Kihn',
		// 	amount: 824.12,
		// 	status: 'Un-paid',
		// 	date: 'Sun Sep 15 2019 06:43:56 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Assunta Grady',
		// 	amount: 172.97,
		// 	status: 'Un-paid',
		// 	date: 'Tue Dec 17 2019 01:46:37 GMT-0300 (Brasilia Standard Time)'
		// },
		// {
		// 	avatar: 'https://i.pravatar.cc/300',
		// 	name: 'Lukas Klocko',
		// 	amount: 515.74,
		// 	status: 'Un-paid',
		// 	date: 'Mon Jun 15 2020 04:04:32 GMT-0300 (Brasilia Standard Time)'
		// }
	];

	const statusColor: {
		[key: string]: 'green' | 'red' | undefined;
	} = {
		'Un-paid': 'red',
		Paid: 'green',
		Completed: undefined
	};

	$: activeUrl = $page.url.searchParams.get('page');
	let pages: LinkType[] = [
		{ name: '6', href: '/components/pagination?page=6' },
		{ name: '7', href: '/components/pagination?page=7' },
		{ name: '8', href: '/components/pagination?page=8' },
		{ name: '9', href: '/components/pagination?page=9' },
		{ name: '10', href: '/components/pagination?page=10' }
	];

	$: {
		pages.forEach((page) => {
			let splitUrl = page.href?.split('?');
			let queryString = splitUrl?.slice(1).join('?');
			const hrefParams = new URLSearchParams(queryString);
			let hrefValue = hrefParams.get('page');
			if (hrefValue === activeUrl) {
				page.active = true;
			} else {
				page.active = false;
			}
		});
		pages = pages;
	}

	const previous = () => {
		alert('Previous btn clicked. Make a call to your server to fetch data.');
	};
	const next = () => {
		alert('Next btn clicked. Make a call to your server to fetch data.');
	};
</script>

<main class="container flex flex-col items-center justify-center">
	<!-- Breadcrumb -->
	<Breadcrumb
		aria-label="Default breadcrumb example"
		navClass="self-start mt-4"
	>
		<BreadcrumbItem home>Dashboard</BreadcrumbItem>
	</Breadcrumb>

	<!-- Cards -->
	<div
		class="container mb-4 grid w-full place-items-center gap-4 md:grid-cols-2 md:px-4 2xl:grid-cols-4"
	>
		{#each cardsData as item}
			<AdminInfoCard
				title={item.title}
				value={item.value}
				icon={item.icon}
				color={item.color}
			/>
		{/each}
	</div>

	<!-- CHARTS -->
	<div class="container mb-4 grid gap-6 md:grid-cols-2 md:place-items-stretch">
		<Card class="scrollbar-none w-full overflow-x-scroll" size="none">
			<Chart options={lineChartOptions} />
		</Card>
		<Card class="scrollbar-none overflow-x-scroll" size="none">
			<Chart options={pieChartOptions} />
		</Card>
	</div>

	<!-- ORDER Container -->
	<div class="container flex flex-col items-center gap-4">
		<!-- ORDER TABLE -->
		<Table shadow divClass="w-full overflow-x-scroll scrollbar-none">
			<TableHead>
				<TableHeadCell>Client</TableHeadCell>
				<TableHeadCell>Order Id</TableHeadCell>
				<TableHeadCell>Amount</TableHeadCell>
				<TableHeadCell>Status</TableHeadCell>
				<TableHeadCell>Date</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				{#each orderData as row, i}
					<TableBodyRow>
						<TableBodyCell>
							<!-- <Avatar src={row.avatar} class="cursor-pointer" /> -->
							{row.name}
						</TableBodyCell>
						<TableBodyCell>#000{i}</TableBodyCell>
						<TableBodyCell>$ {row.amount}</TableBodyCell>
						<TableBodyCell
							><Badge rounded color={statusColor[row.status]}
								>{row.status}</Badge
							></TableBodyCell
						>
						<TableBodyCell
							>{new Date(row.date).toLocaleDateString()}</TableBodyCell
						>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>

		<!-- PAGNIATION -->
		<Pagination {pages} on:previous={previous} on:next={next} icon>
			<svelte:fragment slot="prev">
				<ChevronLeftOutline class="h-2.5 w-2.5" />
			</svelte:fragment>
			<svelte:fragment slot="next">
				<ChevronRightOutline class="h-2.5 w-2.5" />
			</svelte:fragment>
		</Pagination>
	</div>
</main>
