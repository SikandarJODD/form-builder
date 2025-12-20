import type { Agent } from 'package-manager-detector';
import { resolveCommand } from 'package-manager-detector/commands';
import { form_generator } from './form-generator/form-gen.svelte';

class PMCommand {
	agent: Agent = $state('pnpm');

	installCommand = $derived.by(() => {
		const currentAgent = this.agent;
		const adapterPackage =
			form_generator.adapter === 'arktype' ? 'arktype' : form_generator.adapter;

		// Base packages to install
		let packages = ['sveltekit-superforms', adapterPackage];
		if (form_generator.formsnap) {
			packages.push(form_generator.formsnap);
		}

		// Resolve add command
		const addCmd = resolveCommand(currentAgent, 'add', packages);
		let commands: string[] = [];

		if (addCmd) {
			commands.push(`${addCmd.command} ${addCmd.args.join(' ')}`);
		}

		// Shadcn commands - use execute (npx/pnpm dlx/etc)
		const execCmd = resolveCommand(currentAgent, 'execute', [
			'shadcn-svelte@next',
			'add',
			'button',
			'label'
		]);
		if (execCmd) {
			commands.push(`${execCmd.command} ${execCmd.args.join(' ')}`);
		}

		// Additional shadcn components
		let shadcnComponents: string[] = [];
		form_generator.unique_inputs_imports.forEach((input) => {
			if (
				['text', 'number', 'email', 'password'].includes(input) &&
				!shadcnComponents.includes('input')
			) {
				shadcnComponents.push('input');
			} else if (input === 'textarea') {
				shadcnComponents.push('textarea');
			} else if (input === 'switch') {
				shadcnComponents.push('switch');
			} else if (input === 'checkbox') {
				shadcnComponents.push('checkbox');
			} else if (input === 'select') {
				shadcnComponents.push('select');
			} else if (input === 'input-otp') {
				shadcnComponents.push('input-otp');
			} else if (input === 'date-picker') {
				shadcnComponents.push('popover', 'calendar', 'range-calendar');
			} else if (input === 'combobox') {
				shadcnComponents.push('popover', 'command', '@lucide/svelte');
			} else if (input === 'slider') {
				shadcnComponents.push('slider');
			}
		});

		if (shadcnComponents.length > 0) {
			const shadcnCmd = resolveCommand(currentAgent, 'execute', [
				'shadcn-svelte@next',
				'add',
				...shadcnComponents
			]);
			if (shadcnCmd) {
				commands.push(`${shadcnCmd.command} ${shadcnCmd.args.join(' ')}`);
			}
		}

		// jsrepo commands (these don't change per package manager)
		form_generator.unique_imports.forEach((input) => {
			if (input === 'file') {
				commands.push('jsrepo add github/ieedan/shadcn-svelte-extras/ui/file-drop-zone');
			} else if (input === 'tags-input') {
				commands.push('jsrepo add github/ieedan/shadcn-svelte-extras/ui/tags-input');
			} else if (input === 'phone') {
				commands.push('jsrepo add github/ieedan/shadcn-svelte-extras/ui/phone-input');
			} else if (input === 'location-input') {
				commands.push('jsrepo add github/sikandarjodd/form-builder/comps/location-input');
			} else if (input === 'password') {
				commands.push('jsrepo add github/sikandarjodd/form-builder/comps/PasswordInput');
			}
		});

		return commands.join('\n');
	});
}

export const pm_command = new PMCommand();
