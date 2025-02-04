<h1 align="center">
  
  [![HPC4AI-logo](./interface/public/logo_hpc4ai.png)](https://hpc4ai.unito.it/)
  
</h1>

# Overview
This project is a modernized interface for interacting with SLURM.<br>
It allows users to view SLURM data and submit job/reservation requests via an intuitive dashboard.<br>
The interface integrates with our internal API to provide a user-friendly and easy-to-extend solution.

# Features
## Dashboard
On the `Dashboard` users can:
- View an organized list of running/pending SLURM jobs.
- View jobs statistics.
## Nodes
The `Nodes` section provides a view of all available nodes within each partition. Users can:
- See a list of nodes segmented by partition, which can be filtered by state.
- Select nodes of interest and open a form to execute jobs or make reservations.
## Jobs
The `Jobs` page offers a table view of all jobs (alternatively, when selected, only the user's jobs) currently managed by SLURM, as well as controls for job submission. Users can:
- Open a form to initiate new jobs directly from this view.
- Delete a single job or a batch of jobs.
- Click on a job ID to access detailed job state information in a timeline format.
## Reservations
The `Reservations` view shows a list of reservations for all users. Here, users can:
- View all reservations that are currently active or upcoming.
- Open the booking form to make new reservations directly from the reservation list.

# Technologies
This project was built using the following technologies:
- **Next.js**: Used as the main framework.
- **TypeScript**: Employed for type safety.
- **Mantine**: Utilized as a component library to build a modern and consistent UI.

# Installation and Setup
1. **Clone the repository** to your local machine.
2. **Create a `.env` file** in the root directory to define environment variables (`CURRENT_USER`, `LOG_LEVEL`, `SLURM_JWT`).
3. **Run the application locally**: `npm run build` + `npm start` (or `npm run dev`)
4. **Use the application**: Open your browser and navigate to `http://localhost:3000`

# Gallery
![immagine](https://github.com/user-attachments/assets/0c4d7665-841b-49a1-836c-51b71dced3f0)
![immagine](https://github.com/user-attachments/assets/c6f5b272-27dd-490c-b60e-3951ecd08b5a)
![immagine](https://github.com/user-attachments/assets/8de2a460-f2ba-4693-8f72-393a31ac2970)
![immagine](https://github.com/user-attachments/assets/e41d159a-de18-4a06-96aa-b3e7a180089c)
