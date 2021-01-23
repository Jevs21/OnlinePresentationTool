import sys
import os
import random

"""
This script will generate CSS animations for the Online Presentation
Tool. One optional argument is the amount to generate. Default=10.

Format:
@keyframes falling_k8 {
    from { top: -100px; opacity: 0.9; width: 50px; transform: rotate(0deg); }
    to { top: 992px;    opacity: 0.0; width: 30px; transform: rotate(50deg); }
}

"""

def createAnimation(name, ind):
    top_to  = random.randint(750,1400)
    rot_to  = random.randint(10,80)
    rot_neg = random.randint(0,1)
    rot_to  = -1 * rot_to if rot_neg else rot_to

    ret = "@keyframes {k_name}{ind} {{\n\tfrom {{ top: -100px; opacity: 0.9; width: 50px; transform: rotate(0deg); }}\n\tto {{ top: {t_to}px; opacity: 0.0; width: 30px; transform: rotate({r_to}deg); }}\n}}".format(k_name=name, ind=str(ind), t_to=top_to, r_to=rot_to)

    return ret


def main(args):
    name    = args[1] if args[1] else "anim_"
    start_i = int(args[2]) if args[2] else 0
    n       = int(args[3]) if args[3] else 10

    for i in range(n):
        print(createAnimation(name, (start_i + i)))


if __name__ == '__main__':
    sys.exit(main(sys.argv))