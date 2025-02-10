export type docTemplatesType = {
  id: string;
  templateName: string;
  templateContent?: string;
  thumbnail: string;
};

export const docTemplates: docTemplatesType[] = [
  {
    id: "EBnK2fJ4hdbEizXJr6yMwZ1xgTkcCGar",
    templateName: "Blank Document",
    templateContent: `
            <html lang="en">
                <body>
                    <h1>Blank Document</h1>
                    <p>This is a blank template. Customize as needed.</p>
                </body>
            </html>
        `,
    thumbnail: "/templates/blank-document.svg",
  },
  {
    id: "ib2qxQlSquTVC8VD9bIa6PHjW6p9rPiu",
    templateName: "Business Letter",
    templateContent: `
            <html lang="en">
                <body>
                    <h1>Business Letter</h1>
                    <p><strong>Sender:</strong> [Your Name]</p>
                    <p><strong>Recipient:</strong> [Recipient Name]</p>
                    <p><strong>Date:</strong> [Date]</p>
                    
                    <h2>Subject</h2>
                    <p>[Subject of the letter]</p>

                    <h2>Body</h2>
                    <p>[Start with an introduction]</p>
                    <p>[Main message and details]</p>
                    <p>[Closing remarks]</p>

                    <h2>Signature</h2>
                    <p>Best regards,</p>
                    <p>[Your Name]</p>
                    <p>[Your Contact Information]</p>
                </body>
            </html>
        `,
    thumbnail: "/templates/business-letter.svg",
  },
  {
    id: "WqXaHOig4YJAlz0rDsKWfqNz1L9P8sPS",
    templateName: "Project Proposal",
    templateContent: `
            <html lang="en">
                <body>
                    <h1>Project Proposal</h1>
                    <h2>Introduction</h2>
                    <p>This document outlines the proposed project, its goals, and expected outcomes.</p>
                    
                    <h2>Scope & Objectives</h2>
                    <p>The project aims to achieve [specific goals] by implementing [solutions].</p>

                    <h2>Implementation Plan</h2>
                    <p>The project will be carried out in phases:</p>
                    <ul>
                        <li>Phase 1: [Description]</li>
                        <li>Phase 2: [Description]</li>
                        <li>Phase 3: [Description]</li>
                    </ul>

                    <h2>Budget & Timeline</h2>
                    <p>Estimated cost: [Amount]</p>
                    <p>Completion date: [Date]</p>
                </body>
            </html>
        `,
    thumbnail: "/templates/project-proposal.svg",
  },
  {
    id: "TIrsqSwle5HvJ8xO0WY8Y6LKymRvxzvl",
    templateName: "Cover Letter",
    templateContent: `
            <html lang="en">
                <body>
                    <h1>Cover Letter</h1>
                    <p><strong>From:</strong> [Your Name]</p>
                    <p><strong>To:</strong> [Hiring Manager’s Name]</p>
                    <p><strong>Date:</strong> [Date]</p>

                    <h2>Introduction</h2>
                    <p>I am writing to express my interest in [Job Title] at [Company Name].</p>

                    <h2>Body</h2>
                    <p>With my experience in [your expertise], I bring [skills and qualifications] that align with the role.</p>

                    <h2>Conclusion</h2>
                    <p>I would welcome the opportunity to discuss how my skills can contribute to your team.</p>

                    <h2>Signature</h2>
                    <p>Best regards,</p>
                    <p>[Your Name]</p>
                </body>
            </html>
        `,
    thumbnail: "/templates/cover-letter.svg",
  },
  {
    id: "F0nZnSRmFyXYpkIFVeiwxUVl4pWpb0uA",
    templateName: "Resume",
    templateContent: `
            <html lang="en">
                <body>
                    <h1>[Your Name]</h1>
                    <h2>Contact Information</h2>
                    <p>Email: [Your Email]</p>
                    <p>Phone: [Your Phone Number]</p>

                    <h2>Summary</h2>
                    <p>[A brief summary about your experience and skills]</p>

                    <h2>Work Experience</h2>
                    <p><strong>[Job Title]</strong> - [Company Name]</p>
                    <p>[Job duration]</p>
                    <p>[Responsibilities and achievements]</p>

                    <h2>Education</h2>
                    <p>[Degree] - [University Name]</p>
                    <p>[Year of graduation]</p>

                    <h2>Skills</h2>
                    <ul>
                        <li>[Skill 1]</li>
                        <li>[Skill 2]</li>
                        <li>[Skill 3]</li>
                    </ul>
                </body>
            </html>
        `,
    thumbnail: "/templates/resume.svg",
  },
  {
    id: "Ai1yqlG6one2SOz4pdxMBt7oBljjZdmL",
    templateName: "Software Proposal",
    templateContent: `
            <html lang="en">
                <body>
                    <h1>Software Proposal</h1>
                    <h2>Introduction</h2>
                    <p>This document outlines the proposal for a new software project.</p>

                    <h2>Project Overview</h2>
                    <p>The software aims to solve [problem] by providing [solution].</p>

                    <h2>Technical Approach</h2>
                    <p>We will use [technologies] and follow [methodology].</p>

                    <h2>Budget & Timeline</h2>
                    <p>Estimated cost: [Amount]</p>
                    <p>Completion date: [Date]</p>
                </body>
            </html>
        `,
    thumbnail: "/templates/software-proposal.svg",
  },
];
