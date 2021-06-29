CREATE TABLE public."user" (
                               id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
                               email varchar(50) NOT NULL,
                               phone varchar(50) NULL,
                               first_name varchar(50) NOT NULL,
                               last_name varchar(50) NOT NULL,
                               passport varchar(50) NULL,
                               hashcode varchar(255) NULL,
                               active boolean NOT NULL DEFAULT true,
                               created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
                               updated_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
                               CONSTRAINT user_pk PRIMARY KEY (id)
);

CREATE TABLE public.room (
                             id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
                             floor smallint NOT NULL,
                             rooms smallint NOT NULL,
                             price double precision NULL,
                             created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
                             updated_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
                             CONSTRAINT room_pk PRIMARY KEY (id)
);

CREATE TABLE public.booking (
                                id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
                                room_id integer NOT NULL,
                                user_id integer NOT NULL,
                                date_begin date NOT NULL,
                                date_end date NOT NULL,
                                human_count smallint NOT NULL,
                                created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
                                updated_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
                                CONSTRAINT booking_pk PRIMARY KEY (id),
                                CONSTRAINT booking_fk FOREIGN KEY (room_id) REFERENCES public.room(id),
                                CONSTRAINT booking_fk_1 FOREIGN KEY (user_id) REFERENCES public."user"(id)
);


INSERT INTO public.room (floor, rooms, price, created_at, updated_at) VALUES(1, 2, 10.1, '2021-06-29 19:42:34', '2021-06-29 19:42:34');
INSERT INTO public.room (floor, rooms, price, created_at, updated_at) VALUES(1, 1, 9.5, '2021-06-29 19:42:34', '2021-06-29 19:42:34');
INSERT INTO public.room (floor, rooms, price, created_at, updated_at) VALUES(2, 3, 12.7, '2021-06-29 19:42:34', '2021-06-29 19:42:34');

INSERT INTO public."user" (email, phone, first_name, last_name, passport, hashcode, active, created_at, updated_at) VALUES('1@1.com', '12345', 'firstName', 'lastName', '', '$2b$10$ZT7HcoSHj9/s7e1UMq.CjuwLk0G0pfhItqj1AiJMZ60FeYPEAAMR6', true, '2021-06-29 17:27:53', '2021-06-29 17:27:53');

INSERT INTO public.booking (room_id, user_id, date_begin, date_end, human_count, created_at, updated_at) VALUES(1, 1, '2021-05-29', '2021-05-30', 2, '2021-06-29 21:01:10', '2021-06-29 21:01:10');
INSERT INTO public.booking (room_id, user_id, date_begin, date_end, human_count, created_at, updated_at) VALUES(2, 1, '2021-05-30', '2021-06-05', 2, '2021-06-29 19:32:03', '2021-06-29 19:32:03');
