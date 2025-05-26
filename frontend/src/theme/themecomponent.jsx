export const Button = {
  styleOverrides: {
    root: ({ theme, ownerState }) => ({
      "&.primary": {
        backgroundColor: "#123458",
        color: "#D4C9BE",
        "&:hover": {
          backgroundColor: "#D4C9BE",
          color: "black",
          transition: "all 0.3s ease",
        },
      },
    }),
  },
  variants: [
    {
      props: { variant: "contained" },
      style: ({ theme, ownerState }) => ({
        backgroundColor: "#123458",
        color: "#D4C9BE",
        "&:hover": {
          backgroundColor: "#D4C9BE",
          color: "black",
          transition: "all 0.3s ease",
        },
      }),
    },
    {
      props: { variant: "outlined" },
      style: ({ theme, ownerState }) => ({
        color: "#123458",
        borderColor: "#123458",
        borderWidth: "2px",
        "&:hover": {
          backgroundColor: "#D4C9BE",
          color: "black",
          transition: "all 0.3s ease",
        },
      }),
    },
  ],
};
