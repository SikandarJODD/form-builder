// Form Templates Data
import type { FieldRow, InputTypeV2, FieldOption } from '../state/form-v2.svelte';

export interface FormTemplate {
	id: string;
	name: string;
	description: string;
	category: string;
	rows: FieldRow[];
}

// Helper to generate IDs (consistent with FormGeneratorV2)
const generateId = () => crypto.randomUUID().slice(0, 8);

// Helper to create field options
const createOptions = (options: string[]): FieldOption[] => {
	return options.map((opt) => ({
		id: generateId(),
		value: opt.toLowerCase().replace(/\s+/g, '_'),
		label: opt
	}));
};

// Helper to create a basic field
const createField = (
	category: string,
	type: string,
	label: string,
	placeholder: string,
	options?: FieldOption[]
): InputTypeV2 => {
	const fieldId = generateId();
	return {
		id: fieldId,
		named_id: category.replace(/-/g, ''),
		name: label,
		type,
		category,
		label,
		placeholder,
		description: '',
		required: true,
		disabled: false,
		rowId: '',
		position: 'full',
		expanded: false,
		options: options || []
	};
};

// 1. Signup Form Template
const signupFormTemplate: FormTemplate = {
	id: 'signup',
	name: 'Signup Form',
	description: 'you need an account to get started',
	category: 'Authentication',
	rows: [
		// Title (h1)
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'h1', 'Sign Up', ''),
					type: 'h1',
					required: false
				}
			]
		},
		// Description
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'desc', 'you need an account to get started', ''),
					type: 'desc',
					required: false
				}
			]
		},
		// Name
		{
			id: generateId(),
			fields: [createField('text', 'text', 'Name', 'Enter your name')]
		},
		// Email
		{
			id: generateId(),
			fields: [createField('email', 'email', 'Email', 'Enter your email')]
		},
		// Password
		{
			id: generateId(),
			fields: [createField('password', 'password', 'Password', 'Password')]
		},
		// Confirm Password
		{
			id: generateId(),
			fields: [createField('password', 'password', 'Confirm Password', 'Confirm password')]
		},
		// Checkbox - Terms and Conditions
		{
			id: generateId(),
			fields: [
				{
					...createField('checkbox', 'boolean', 'Terms', 'I agree to the terms and conditions'),
					label: 'I agree to the terms and conditions',
					placeholder: ''
				}
			]
		}
	]
};

// Update rowId for all fields based on their row
signupFormTemplate.rows.forEach((row) => {
	row.fields.forEach((field) => {
		field.rowId = row.id;
	});
});

// 2. Login Form Template
const loginFormTemplate: FormTemplate = {
	id: 'login',
	name: 'Login Form',
	description: 'Login to create an account',
	category: 'Authentication',
	rows: [
		// Title (h1)
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'h1', 'Login', ''),
					type: 'h1',
					required: false
				}
			]
		},
		// Description
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'desc', 'Login to create an account', ''),
					type: 'desc',
					required: false
				}
			]
		},
		// Email
		{
			id: generateId(),
			fields: [createField('email', 'email', 'Email', 'Enter your email')]
		},
		// Password
		{
			id: generateId(),
			fields: [createField('password', 'password', 'Password', 'Password')]
		}
	]
};

loginFormTemplate.rows.forEach((row) => {
	row.fields.forEach((field) => {
		field.rowId = row.id;
	});
});

// 3. Feedback Form Template
const feedbackFormTemplate: FormTemplate = {
	id: 'feedback',
	name: 'Feedback Form',
	description: 'please provide your feedback',
	category: 'Feedback',
	rows: [
		// Title
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'h1', 'Feedback Form', ''),
					type: 'h1',
					required: false
				}
			]
		},
		// Description
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'desc', 'please provide your feedback', ''),
					type: 'desc',
					required: false
				}
			]
		},
		// Feedback Comment (Textarea)
		{
			id: generateId(),
			fields: [
				{
					...createField('textarea', 'text', 'Feedback Comment', 'share your feedback'),
					type: 'textarea'
				}
			]
		}
	]
};

feedbackFormTemplate.rows.forEach((row) => {
	row.fields.forEach((field) => {
		field.rowId = row.id;
	});
});

// 4. Waitlist Form Template
const waitlistFormTemplate: FormTemplate = {
	id: 'waitlist',
	name: 'Waitlist Form',
	description: 'Join our waitlist to get early access',
	category: 'Marketing',
	rows: [
		// Title
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'h1', 'Waitlist', ''),
					type: 'h1',
					required: false
				}
			]
		},
		// Description
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'desc', 'Join our waitlist to get early access', ''),
					type: 'desc',
					required: false
				}
			]
		},
		// Email
		{
			id: generateId(),
			fields: [createField('email', 'email', 'Email', 'Enter your email')]
		}
	]
};

waitlistFormTemplate.rows.forEach((row) => {
	row.fields.forEach((field) => {
		field.rowId = row.id;
	});
});

// 5. Contact Us Template (with side-by-side name + email)
const contactUsTemplate: FormTemplate = {
	id: 'contact',
	name: 'Contact Us ',
	description: 'Get in touch with us',
	category: 'Contact',
	rows: [
		// Title
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'h1', 'Contact Us', ''),
					type: 'h1',
					required: false
				}
			]
		},
		// Description
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'desc', 'Get in touch with us', ''),
					type: 'desc',
					required: false
				}
			]
		},
		// Name + Email (side-by-side)
		{
			id: generateId(),
			fields: [
				{
					...createField('text', 'text', 'Name', 'enter your name'),
					position: 'left'
				},
				{
					...createField('email', 'email', 'Email', 'Enter your email'),
					position: 'right'
				}
			]
		},
		// Message (Textarea)
		{
			id: generateId(),
			fields: [
				{
					...createField('textarea', 'text', 'Message', 'Enter your message'),
					type: 'textarea'
				}
			]
		},
		// Checkbox - Terms
		{
			id: generateId(),
			fields: [
				{
					...createField('checkbox', 'boolean', 'Terms', ''),
					label: 'I agree to the terms and conditions',
					placeholder: ''
				}
			]
		}
	]
};

contactUsTemplate.rows.forEach((row) => {
	row.fields.forEach((field) => {
		field.rowId = row.id;
	});
});

// 6. Job Application Template
const jobApplicationTemplate: FormTemplate = {
	id: 'job-application',
	name: 'Job Application',
	description: 'Please fill out the form below to apply for this position',
	category: 'Application',
	rows: [
		// Title
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'h1', 'Job Application', ''),
					type: 'h1',
					required: false
				}
			]
		},
		// Description
		{
			id: generateId(),
			fields: [
				{
					...createField(
						'display',
						'desc',
						'Please fill out the form below to apply for this position',
						''
					),
					type: 'desc',
					required: false
				}
			]
		},
		// First Name + Last Name (side-by-side)
		{
			id: generateId(),
			fields: [
				{
					...createField('text', 'text', 'First Name', 'enter your first name'),
					position: 'left'
				},
				{
					...createField('text', 'text', 'Last Name', 'enter your last name'),
					position: 'right'
				}
			]
		},
		// Email
		{
			id: generateId(),
			fields: [createField('email', 'email', 'Email', 'Enter your email')]
		},
		// GitHub URL
		{
			id: generateId(),
			fields: [createField('text', 'text', 'GitHub URL', 'enter your GitHub URL')]
		},
		// LinkedIn URL
		{
			id: generateId(),
			fields: [createField('text', 'text', 'LinkedIn URL', 'enter your LinkedIn URL')]
		},
		// Position (Radio)
		{
			id: generateId(),
			fields: [
				{
					...createField(
						'radio',
						'radio',
						'Position',
						'which position are you applying for',
						createOptions([
							'Frontend Developer',
							'Backend Developer',
							'Full Stack Developer',
							'UI/UX Designer',
							'Product Manager'
						])
					),
					type: 'radio'
				}
			]
		},
		// Years of Experience (Select)
		{
			id: generateId(),
			fields: [
				{
					...createField(
						'select',
						'select',
						'Years of Experience',
						'Years of Experience',
						createOptions(['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years'])
					),
					type: 'select'
				}
			]
		},
		// Cover Letter (Textarea)
		{
			id: generateId(),
			fields: [
				{
					...createField(
						'textarea',
						'text',
						'Cover Letter',
						"Tell us why you're interested in this position…"
					),
					type: 'textarea'
				}
			]
		}
	]
};

jobApplicationTemplate.rows.forEach((row) => {
	row.fields.forEach((field) => {
		field.rowId = row.id;
	});
});

// 7. Event Registration Template
const eventRegistrationTemplate: FormTemplate = {
	id: 'event-registration',
	name: 'Event Registration',
	description: 'Register for our upcoming event',
	category: 'Event',
	rows: [
		// Title
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'h1', 'Event Registration', ''),
					type: 'h1',
					required: false
				}
			]
		},
		// Description
		{
			id: generateId(),
			fields: [
				{
					...createField('display', 'desc', 'Register for our upcoming event', ''),
					type: 'desc',
					required: false
				}
			]
		},
		// First Name + Last Name (side-by-side)
		{
			id: generateId(),
			fields: [
				{
					...createField('text', 'text', 'First Name', 'enter your first name'),
					position: 'left'
				},
				{
					...createField('text', 'text', 'Last Name', 'enter your last name'),
					position: 'right'
				}
			]
		},
		// Email
		{
			id: generateId(),
			fields: [createField('email', 'email', 'Email', 'Enter your email')]
		},
		// Company/Organization
		{
			id: generateId(),
			fields: [
				createField('text', 'text', 'Company/Organization', 'enter your company name')
			]
		},
		// Ticket Type (Radio)
		{
			id: generateId(),
			fields: [
				{
					...createField(
						'radio',
						'radio',
						'Ticket Type',
						'Select your ticket type',
						createOptions([
							'General Admission - Free',
							'VIP Access - $99',
							'Premium Package - $199'
						])
					),
					type: 'radio'
				}
			]
		},
		// Additional Comments (Textarea)
		{
			id: generateId(),
			fields: [
				{
					...createField(
						'textarea',
						'text',
						'Additional Comments',
						'Any special requirements or questions?'
					),
					type: 'textarea'
				}
			]
		}
	]
};

eventRegistrationTemplate.rows.forEach((row) => {
	row.fields.forEach((field) => {
		field.rowId = row.id;
	});
});

// Export all templates
export const templates: FormTemplate[] = [
	signupFormTemplate,
	loginFormTemplate,
	feedbackFormTemplate,
	waitlistFormTemplate,
	contactUsTemplate,
	jobApplicationTemplate,
	eventRegistrationTemplate
];
