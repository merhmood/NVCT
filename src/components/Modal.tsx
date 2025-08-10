"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const Modal = React.memo(function Modal({
  children,
  onSetModal,
  type,
}: {
  children: React.ReactNode;
  onSetModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: "updates" | "mobile-nav" | "pdf" | "gallery" | "popup" | "history";
}) {
  const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const body = document.querySelector("body");
    body?.setAttribute("style", "overflow:scroll-y");

    const modal = document.getElementById("modal");

    // Remove all modal nodes on close
    if (modal?.lastChild)
      while (modal?.hasChildNodes()) modal?.removeChild(modal.lastChild);

    onSetModal(false);
    e.stopPropagation();
  };

  const modalContainer = document.createElement("div");

  useEffect(() => {
    const modal = document.getElementById("modal");

    // Append the modal container to the modal element
    modalContainer && modal?.appendChild(modalContainer);

    // Disable scrolling
    const body = document.querySelector("body");
    body?.setAttribute("style", "overflow:hidden");
    () => {
      // Remove the modal container from the modal element
      if (modal?.lastChild) modal?.removeChild(modal.lastChild);
    };
  }, []);

  if (modalContainer)
    if (type === "updates")
      return createPortal(
        <ModalChildrenForUpdates closeModal={closeModal}>
          {children}
        </ModalChildrenForUpdates>,
        modalContainer
      );
    else if (type === "popup")
      return createPortal(
        <ModalChildrenForPopUp closeModal={closeModal}>
          {children}
        </ModalChildrenForPopUp>,
        modalContainer
      );
    else if (type === "pdf")
      return createPortal(
        <ModalChildrenForPdfView closeModal={closeModal}>
          {children}
        </ModalChildrenForPdfView>,
        modalContainer
      );
    else if (type === "gallery")
      return createPortal(
        <ModalChildrenForGallery closeModal={closeModal}>
          {children}
        </ModalChildrenForGallery>,
        modalContainer
      );
    else if (type === "history")
      return createPortal(
        <ModalChildrenForHistory closeModal={closeModal}>
          {children}
        </ModalChildrenForHistory>,
        modalContainer
      );
    else
      return createPortal(
        <ModalChildrenForMobileNav closeModal={closeModal}>
          {children}
        </ModalChildrenForMobileNav>,
        modalContainer
      );
});

const ModalChildrenForUpdates = ({
  closeModal,
  children,
}: {
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed top-0 backdrop-blur-sm bg-black/15 h-screen w-screen z-50">
      <div className="w-full">
        <div className="flex sticky justify-center mb-5 z-50">
          <button
            className={`block sticky px-7 rounded-full w-16 h-16 z-40 mt-4`}
            onClick={(e) => closeModal(e)}
          >
            <Image
              src="/icons/close.png"
              alt="close icon"
              fill
              objectFit="cover"
            />
          </button>
        </div>
        <div className="h-screen overflow-y-auto pb-28 modal-content-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

const ModalChildrenForPopUp = ({
  closeModal,
  children,
}: {
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed top-0 backdrop-blur-sm bg-black/15 h-screen w-screen z-50">
      <div className="flex flex-col items-end w-11/12 h-full max-w-6xl mx-auto pt-10">
        <button
          onClick={(e) => closeModal(e)}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
            background: "rgba(255,255,255,0.6)",
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            cursor: "pointer",
          }}
        >
          ×
        </button>
        <div className="flex justify-end w-full h-full  mt-5">
          <div className=" py-5 w-11/12 max-w-6xl h-full mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalChildrenForPdfView = ({
  closeModal,
  children,
}: {
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed top-0 backdrop-blur-sm bg-black/15 h-screen w-screen z-50">
      <div className="flex flex-col items-end w-11/12 max-w-6xl mx-auto pt-10">
        <button
          className="block relative w-10 h-10 cursor-pointer"
          onClick={(e) => closeModal(e)}
        >
          <Image
            src="/icons/close.png"
            alt="close icons"
            fill
            objectFit="cover"
          />
        </button>
        <div className="flex justify-end w-full  mt-5">
          <div className=" bg-white p-5 w-11/12 max-w-6xl mx-auto rounded-md border border-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalChildrenForGallery = ({
  closeModal,
  children,
}: {
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed top-0 backdrop-blur-sm bg-black/15 h-screen w-screen z-50">
      <div className="grid place-items-center w-full h-screen">
        <div>
          <div className="flex justify-center mb-5 z-50">
            <button
              className={`block sticky px-7 rounded-full w-16 h-16 z-40 mt-4`}
              onClick={(e) => closeModal(e)}
            >
              <Image
                src="/icons/close.png"
                alt="close icon"
                fill
                objectFit="cover"
              />
            </button>
          </div>
          <div className="overflow-y-auto modal-content-scroll w-11/12 mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalChildrenForHistory = ({
  closeModal,
  children,
}: {
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed top-0 backdrop-blur-sm bg-black/15 h-screen w-screen z-50">
      <div className="grid place-items-center w-full h-screen">
        <div>
          <div className="flex justify-center mb-5 z-50">
            <button
              className={`block sticky px-7 rounded-full w-16 h-16 z-40 mt-4`}
              onClick={(e) => closeModal(e)}
            >
              <Image
                src="/icons/close.png"
                alt="close icon"
                fill
                objectFit="cover"
              />
            </button>
          </div>
          <div className="w-11/12 mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

const ModalChildrenForMobileNav = ({
  closeModal,
  children,
}: {
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed top-0 backdrop-blur-md bg-white/10 h-screen w-screen z-50">
      <div className="flex flex-col items-end w-full pt-10 pr-10">
        <button
          className="block relative w-10 h-10 cursor-pointer"
          onClick={(e) => closeModal(e)}
        >
          <Image
            src="/icons/close.png"
            alt="close icons"
            fill
            objectFit="cover"
          />
        </button>
        <div className="flex justify-end w-full mt-5">
          <div className=" bg-white w-3/5 p-5 rounded-md border border-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
